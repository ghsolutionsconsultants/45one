/**
 * Refreshes the audience snapshot in content/stats.json.
 *
 * Instagram (and sometimes TikTok) refuse requests from Vercel's datacentre
 * IPs, so the live fetch in src/lib/stats.ts can come back empty in
 * production. This script runs on a schedule from GitHub Actions, where the
 * requests do get through, and commits the numbers for the site to fall back
 * on. Anything it cannot read keeps its previous value rather than being
 * wiped.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "content", "stats.json");
const FPL_OUT = join(process.cwd(), "content", "fpl-standings.json");
const FPL_LEAGUE_ID = process.env.FPL_LEAGUE_ID || "1306638";
const CRAWLER_UA = "facebookexternalhit/1.1";

const YT_CHANNEL = process.env.YOUTUBE_CHANNEL_ID || "UCJF9nMe1hKT22XskyCdlinA";
const IG_URL = "https://www.instagram.com/45one_za/";
const TT_URL = "https://www.tiktok.com/@45one_za_";
const YT_URL = "https://www.youtube.com/@45oneza";

function parseCompact(text) {
  const m = String(text).replace(/,/g, "").match(/^([\d.]+)([KMB])?$/i);
  if (!m) return null;
  const mult = { K: 1e3, M: 1e6, B: 1e9 }[(m[2] || "").toUpperCase()] || 1;
  return Math.round(parseFloat(m[1]) * mult);
}

function countFrom(text, word) {
  const m = text.match(new RegExp(`([\\d.,]+[KMB]?)\\s+${word}`, "i"));
  return m ? parseCompact(m[1]) : null;
}

async function ogDescription(url) {
  const res = await fetch(url, {
    headers: { "user-agent": CRAWLER_UA, accept: "text/html" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const html = await res.text();
  const m = html.match(
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i
  );
  if (!m) throw new Error(`no og:description at ${url}`);
  return m[1].replace(/&#0?(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
}

async function instagram() {
  const text = await ogDescription(IG_URL);
  return { followers: countFrom(text, "Followers"), posts: countFrom(text, "Posts") };
}

async function tiktok() {
  const text = await ogDescription(TT_URL);
  return { followers: countFrom(text, "Followers"), likes: countFrom(text, "Likes") };
}

async function youtube() {
  const key = process.env.YOUTUBE_API_KEY;
  if (key) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL}&key=${key}`
    );
    if (res.ok) {
      const s = (await res.json())?.items?.[0]?.statistics;
      if (s) {
        return {
          subscribers: Number(s.subscriberCount) || null,
          views: Number(s.viewCount) || null,
        };
      }
    }
  }
  const res = await fetch(YT_URL, {
    headers: { "user-agent": CRAWLER_UA, "accept-language": "en-US,en;q=0.9" },
  });
  const html = await res.text();
  const m = html.match(/"([\d.,]+[KMB]?) subscribers"/);
  if (!m) throw new Error("no subscriber count");
  return { subscribers: parseCompact(m[1]), views: null };
}

/**
 * League table from the public FPL API. Committed as a fallback so the site
 * still shows real standings if the API is unreachable from the host.
 */
/**
 * The highest-scoring squad of the latest gameweek, resolved into named
 * players with their points, so the site can lay it out on a pitch.
 */
async function buildTeamOfTheWeek(standings, history) {
  const events = Object.values(history).flat().map((g) => g.event);
  if (!events.length) return null;
  const gw = Math.max(...events);

  const top = [...standings].sort((a, b) => b.gw - a.gw)[0];
  if (!top) return null;

  const get = async (url) => {
    const r = await fetch(url, {
      headers: { "user-agent": "45one.co.za league table" },
    });
    if (!r.ok) throw new Error(`${url} -> ${r.status}`);
    return r.json();
  };

  const [picks, boot, live] = await Promise.all([
    get(`https://fantasy.premierleague.com/api/entry/${top.entry}/event/${gw}/picks/`),
    get("https://fantasy.premierleague.com/api/bootstrap-static/"),
    get(`https://fantasy.premierleague.com/api/event/${gw}/live/`),
  ]);

  const byId = new Map(boot.elements.map((e) => [e.id, e]));
  const clubs = new Map(boot.teams.map((t) => [t.id, t.short_name]));
  const types = new Map(
    boot.element_types.map((t) => [t.id, t.singular_name_short])
  );
  const points = new Map(
    live.elements.map((e) => [e.id, e.stats.total_points])
  );

  const players = picks.picks.map((p) => {
    const el = byId.get(p.element);
    const base = points.get(p.element) ?? 0;
    return {
      name: el?.web_name ?? "Unknown",
      club: clubs.get(el?.team) ?? "",
      position: types.get(p.element_type) ?? "",
      points: base * (p.multiplier || 1),
      raw: base,
      multiplier: p.multiplier,
      captain: p.is_captain,
      viceCaptain: p.is_vice_captain,
      bench: p.position > 11,
      order: p.position,
    };
  });

  return {
    gw,
    team: top.team,
    manager: top.manager,
    points: picks.entry_history?.points ?? top.gw,
    bench: picks.entry_history?.points_on_bench ?? 0,
    hit: picks.entry_history?.event_transfers_cost ?? 0,
    chip: picks.active_chip ?? null,
    players,
  };
}

async function refreshStandings() {
  const res = await fetch(
    `https://fantasy.premierleague.com/api/leagues-classic/${FPL_LEAGUE_ID}/standings/`,
    { headers: { "user-agent": "45one.co.za league table" } }
  );
  if (!res.ok) throw new Error(`FPL API ${res.status}`);

  const json = await res.json();
  const results = json?.standings?.results;
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error("no standings returned");
  }

  const standings = results.map((r) => ({
    rank: r.rank,
    lastRank: r.last_rank,
    entry: r.entry,
    team: r.entry_name,
    manager: r.player_name,
    gw: r.event_total,
    total: r.total,
  }));

  // Per-manager gameweek history, so the site can work out form, quarters,
  // bench points and transfer hits. Fetched a few at a time to stay polite.
  const history = {};
  const queue = [...standings];
  const workers = Array.from({ length: 5 }, async () => {
    while (queue.length) {
      const row = queue.shift();
      if (!row) return;
      try {
        const r = await fetch(
          `https://fantasy.premierleague.com/api/entry/${row.entry}/history/`,
          { headers: { "user-agent": "45one.co.za league table" } }
        );
        if (!r.ok) continue;
        const h = await r.json();
        history[row.entry] = (h.current ?? []).map((g) => ({
          event: g.event,
          points: g.points,
          bench: g.points_on_bench,
          hit: g.event_transfers_cost,
          transfers: g.event_transfers,
        }));
      } catch {
        /* skip this manager, the table still works without their history */
      }
    }
  });
  await Promise.all(workers);

  const teamOfTheWeek = await buildTeamOfTheWeek(standings, history);

  const snap = {
    league: json.league?.name ?? "45one Premier League",
    leagueId: Number(FPL_LEAGUE_ID),
    updatedAt: new Date().toISOString(),
    standings,
    history,
    teamOfTheWeek,
  };

  writeFileSync(FPL_OUT, JSON.stringify(snap, null, 2) + "\n");
  return `${standings.length} managers, ${Object.keys(history).length} histories`;
}

let previous = {};
try {
  previous = JSON.parse(readFileSync(OUT, "utf8"));
} catch {
  /* first run */
}

const next = { ...previous };
const results = [];

for (const [name, fn] of [
  ["instagram", instagram],
  ["tiktok", tiktok],
  ["youtube", youtube],
]) {
  try {
    const value = await fn();
    // keep an old value if this run came back empty
    const merged = { ...(previous[name] || {}) };
    for (const [k, v] of Object.entries(value)) if (v !== null) merged[k] = v;
    next[name] = merged;
    results.push(`${name}: ${JSON.stringify(merged)}`);
  } catch (err) {
    results.push(`${name}: FAILED (${err.message}), keeping previous`);
  }
}

try {
  const summary = await refreshStandings();
  results.push(`fpl: ${summary}`);
} catch (err) {
  results.push(`fpl: FAILED (${err.message}), keeping previous table`);
}

next.updatedAt = new Date().toISOString();

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
console.log(results.join("\n"));
console.log("wrote", OUT);
