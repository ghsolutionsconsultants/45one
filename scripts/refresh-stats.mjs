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

next.updatedAt = new Date().toISOString();

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
console.log(results.join("\n"));
console.log("wrote", OUT);
