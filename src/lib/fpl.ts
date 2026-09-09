import snapshot from "../../content/fpl-standings.json";
import { site } from "./site";

export type Standing = {
  rank: number;
  lastRank?: number;
  entry?: number;
  team: string;
  manager: string;
  /** Points scored in the most recent gameweek */
  gw: number;
  total: number;
};

export type TotwPlayer = {
  name: string;
  club: string;
  position: string;
  points: number;
  raw: number;
  multiplier: number;
  captain: boolean;
  viceCaptain: boolean;
  bench: boolean;
  order: number;
};

export type TeamOfTheWeek = {
  gw: number;
  team: string;
  manager: string;
  points: number;
  bench: number;
  hit: number;
  chip: string | null;
  players: TotwPlayer[];
};

export type GameweekRow = {
  event: number;
  points: number;
  bench: number;
  hit: number;
  transfers: number;
};

export type StandingsResult = {
  standings: Standing[];
  /** When these figures were read */
  updatedAt: string;
  /** True when they came from the FPL API on this request */
  live: boolean;
};

type ApiResponse = {
  league?: { name?: string };
  standings?: {
    results?: {
      rank: number;
      last_rank: number;
      entry: number;
      entry_name: string;
      player_name: string;
      event_total: number;
      total: number;
    }[];
  };
};

const snap = snapshot as {
  league: string;
  leagueId: number;
  updatedAt: string;
  standings: Standing[];
  history: Record<string, GameweekRow[]>;
  teamOfTheWeek: TeamOfTheWeek | null;
};

/**
 * Reads the league table from the public Fantasy Premier League API.
 *
 * Falls back to content/fpl-standings.json, which the scheduled job in
 * .github/workflows/refresh-stats.yml keeps current, so the table still shows
 * real figures if the API is unreachable from the host.
 */
export async function getStandings(): Promise<StandingsResult> {
  const id = site.fpl.leagueId;

  try {
    const res = await fetch(
      `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings/`,
      {
        headers: { "user-agent": "45one.co.za league table" },
        next: { revalidate: 1800 },
      }
    );
    if (!res.ok) throw new Error(String(res.status));

    const json = (await res.json()) as ApiResponse;
    const results = json.standings?.results;
    if (!results?.length) throw new Error("empty standings");

    return {
      standings: results.map((r) => ({
        rank: r.rank,
        lastRank: r.last_rank,
        entry: r.entry,
        team: r.entry_name,
        manager: r.player_name,
        gw: r.event_total,
        total: r.total,
      })),
      updatedAt: new Date().toISOString(),
      live: true,
    };
  } catch {
    return {
      standings: snap.standings,
      updatedAt: snap.updatedAt,
      live: false,
    };
  }
}

/** The highest-scoring squad of the latest gameweek, with its players. */
export const teamOfTheWeek: TeamOfTheWeek | null = snap.teamOfTheWeek ?? null;

/** Snapshot values, safe to use in metadata and static copy. */
export const snapshotStandings = snap.standings;
export const managerCount = snap.standings.length;
export const leader = snap.standings[0];

/* ------------------------------------------------------------------ *
 * League stats
 * ------------------------------------------------------------------ */

export type Award = {
  team: string;
  manager: string;
  value: number;
  /** Optional second line, e.g. which gameweek it happened in */
  note?: string;
};

export type QuarterTable = {
  label: string;
  range: string;
  /** Gameweeks in this quarter that have actually been played */
  played: number;
  leaders: Award[];
};

export type GameweekWinner = {
  event: number;
  team: string;
  manager: string;
  points: number;
};

export type RaceLine = {
  team: string;
  manager: string;
  rank: number;
  /** Cumulative total after each gameweek */
  points: number[];
};

export type LeagueStats = {
  gameweekWinners: GameweekWinner[];
  race: { events: number[]; lines: RaceLine[] };
  /** Points per gameweek keyed by entry id, for the table sparklines */
  form: Record<string, number[]>;
  gameweek: number | null;
  managerOfTheWeek: Award | null;
  topGameweek: Award[];
  climbers: Award[];
  fallers: Award[];
  averageGw: number;
  averageTotal: number;
  medianTotal: number;
  spread: number;
  chasingPack: number;
  seasonBest: Award | null;
  formTable: Award[];
  benchKings: Award[];
  hitTakers: Award[];
  mostConsistent: Award[];
  quarters: QuarterTable[];
};

const QUARTERS: [string, number, number][] = [
  ["First quarter", 1, 9],
  ["Second quarter", 10, 19],
  ["Third quarter", 20, 28],
  ["Final quarter", 29, 38],
];

function byValue(a: Award, b: Award) {
  return b.value - a.value;
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((x, y) => x - y);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

/**
 * Everything on the league page beyond the table itself. Standings come from
 * the live request; per-gameweek history comes from the committed snapshot,
 * which the scheduled job refreshes.
 */
export function getLeagueStats(standings: Standing[]): LeagueStats {
  const history = snap.history ?? {};
  const rowsFor = (s: Standing): GameweekRow[] =>
    s.entry === undefined ? [] : (history[String(s.entry)] ?? []);
  const named = (s: Standing) => ({ team: s.team, manager: s.manager });

  const totals = standings.map((s) => s.total);
  const gws = standings.map((s) => s.gw);

  // Which gameweek was the most recent one played
  const events = Object.values(history)
    .flat()
    .map((g) => g.event);
  const gameweek = events.length ? Math.max(...events) : null;

  const gwAwards = standings
    .map((s) => ({ ...named(s), value: s.gw }))
    .sort(byValue);

  const moves = standings
    .filter((s) => typeof s.lastRank === "number" && s.lastRank! > 0)
    .map((s) => ({ ...named(s), value: s.lastRank! - s.rank }));

  // Season-long numbers from each manager's history
  const seasonRows = standings.map((s) => {
    const rows = rowsFor(s);
    const points = rows.map((r) => r.points);
    const best = points.length ? Math.max(...points) : 0;
    const bestEvent = rows.find((r) => r.points === best)?.event;
    const mean = points.length
      ? points.reduce((a, b) => a + b, 0) / points.length
      : 0;
    const variance = points.length
      ? points.reduce((a, b) => a + (b - mean) ** 2, 0) / points.length
      : 0;
    const lastThree = rows.slice(-3).reduce((a, r) => a + r.points, 0);

    return {
      ...named(s),
      rows,
      best,
      bestEvent,
      bench: rows.reduce((a, r) => a + r.bench, 0),
      hits: rows.reduce((a, r) => a + r.hit, 0),
      swing: Math.round(Math.sqrt(variance)),
      lastThree,
      played: rows.length,
    };
  });

  const withHistory = seasonRows.filter((r) => r.played > 0);

  const seasonBestRow = [...withHistory].sort((a, b) => b.best - a.best)[0];

  const quarters: QuarterTable[] = QUARTERS.map(([label, from, to]) => {
    const leaders = withHistory
      .map((r) => {
        const inRange = r.rows.filter(
          (g) => g.event >= from && g.event <= to
        );
        return {
          team: r.team,
          manager: r.manager,
          value: inRange.reduce((a, g) => a + g.points, 0),
          note: `${inRange.length} GW${inRange.length === 1 ? "" : "s"}`,
        };
      })
      .sort(byValue)
      .slice(0, 3);

    const played = Math.max(
      0,
      ...withHistory.map(
        (r) => r.rows.filter((g) => g.event >= from && g.event <= to).length
      )
    );

    return {
      label,
      range: `GW ${from}\u2013${to}`,
      played,
      leaders: played > 0 ? leaders : [],
    };
  });

  // Who won each gameweek outright
  const allEvents = [...new Set(events)].sort((a, b) => a - b);
  const gameweekWinners: GameweekWinner[] = allEvents
    .map((event) => {
      let best: GameweekWinner | null = null;
      for (const s of standings) {
        const row = rowsFor(s).find((g) => g.event === event);
        if (!row) continue;
        if (!best || row.points > best.points) {
          best = {
            event,
            team: s.team,
            manager: s.manager,
            points: row.points,
          };
        }
      }
      return best;
    })
    .filter((w): w is GameweekWinner => w !== null);

  // Cumulative points per gameweek for the title race chart
  const race = {
    events: allEvents,
    lines: standings.slice(0, 8).map((s) => {
      const rows = rowsFor(s);
      let running = 0;
      return {
        team: s.team,
        manager: s.manager,
        rank: s.rank,
        points: allEvents.map((event) => {
          const row = rows.find((g) => g.event === event);
          running += row?.points ?? 0;
          return running;
        }),
      };
    }),
  };

  const form: Record<string, number[]> = {};
  for (const s of standings) {
    const rows = rowsFor(s);
    if (rows.length) form[String(s.entry)] = rows.map((r) => r.points);
  }

  return {
    gameweekWinners,
    race,
    form,
    gameweek,
    managerOfTheWeek: gwAwards[0] ?? null,
    topGameweek: gwAwards.slice(0, 5),
    climbers: moves.filter((m) => m.value > 0).sort(byValue).slice(0, 3),
    fallers: moves
      .filter((m) => m.value < 0)
      .sort((a, b) => a.value - b.value)
      .slice(0, 3),
    averageGw: Math.round(gws.reduce((a, b) => a + b, 0) / (gws.length || 1)),
    averageTotal: Math.round(
      totals.reduce((a, b) => a + b, 0) / (totals.length || 1)
    ),
    medianTotal: median(totals),
    spread: (totals[0] ?? 0) - (totals[totals.length - 1] ?? 0),
    chasingPack: totals.filter((t) => (totals[0] ?? 0) - t <= 20).length,
    seasonBest: seasonBestRow
      ? {
          team: seasonBestRow.team,
          manager: seasonBestRow.manager,
          value: seasonBestRow.best,
          note: seasonBestRow.bestEvent ? `GW ${seasonBestRow.bestEvent}` : undefined,
        }
      : null,
    formTable: [...withHistory]
      .sort((a, b) => b.lastThree - a.lastThree)
      .slice(0, 5)
      .map((r) => ({ team: r.team, manager: r.manager, value: r.lastThree })),
    benchKings: [...withHistory]
      .sort((a, b) => b.bench - a.bench)
      .slice(0, 3)
      .map((r) => ({ team: r.team, manager: r.manager, value: r.bench })),
    hitTakers: [...withHistory]
      .sort((a, b) => b.hits - a.hits)
      .slice(0, 3)
      .map((r) => ({ team: r.team, manager: r.manager, value: r.hits })),
    mostConsistent: [...withHistory]
      .filter((r) => r.played >= 2)
      .sort((a, b) => a.swing - b.swing)
      .slice(0, 3)
      .map((r) => ({ team: r.team, manager: r.manager, value: r.swing })),
    quarters,
  };
}
