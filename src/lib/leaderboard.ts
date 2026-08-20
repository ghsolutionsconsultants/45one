/**
 * Leaderboard storage.
 *
 * Uses a Redis-compatible REST store when one is configured (Vercel KV or
 * Upstash both expose the same API). Without it there is nowhere durable to
 * write on a serverless host, so the API reports itself as unconfigured and
 * the page falls back to a device-local board rather than pretending to be
 * global.
 */
export type Entry = {
  name: string;
  quiz: string;
  score: number;
  total: number;
  seconds: number;
  at: string;
};

const KEY = "45one:leaderboard";

function config() {
  const url =
    process.env.KV_REST_API_URL?.trim() ??
    process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token =
    process.env.KV_REST_API_TOKEN?.trim() ??
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return url && token ? { url, token } : null;
}

export function isConfigured() {
  return config() !== null;
}

/** Higher score wins, then the faster run. */
function rank(entry: Entry) {
  const accuracy = entry.total > 0 ? entry.score / entry.total : 0;
  const speedBonus = Math.max(0, 1000 - Math.min(entry.seconds, 999));
  return Math.round(accuracy * 1_000_000 + speedBonus);
}

async function command(parts: (string | number)[]): Promise<unknown> {
  const cfg = config();
  if (!cfg) throw new Error("Leaderboard store is not configured");

  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parts),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Leaderboard store error ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

export async function addEntry(entry: Entry) {
  await command(["ZADD", KEY, rank(entry), JSON.stringify(entry)]);
  // keep the board to a sane size
  await command(["ZREMRANGEBYRANK", KEY, 0, -201]);
}

export async function topEntries(limit = 25): Promise<Entry[]> {
  const raw = (await command([
    "ZRANGE",
    KEY,
    0,
    limit - 1,
    "REV",
  ])) as string[] | null;

  if (!Array.isArray(raw)) return [];

  return raw
    .map((row) => {
      try {
        return JSON.parse(row) as Entry;
      } catch {
        return null;
      }
    })
    .filter((e): e is Entry => e !== null);
}

/** Trims and bounds anything a visitor typed. */
export function cleanEntry(body: Record<string, unknown>): Entry | null {
  const name = String(body.name ?? "").trim().slice(0, 24);
  const quiz = String(body.quiz ?? "").trim().slice(0, 32);
  const score = Number(body.score);
  const total = Number(body.total);
  const seconds = Number(body.seconds);

  if (!name || !quiz) return null;
  if (!Number.isFinite(score) || !Number.isFinite(total)) return null;
  if (score < 0 || total <= 0 || score > total || total > 100) return null;
  if (!Number.isFinite(seconds) || seconds < 0 || seconds > 60 * 60) return null;

  return {
    name,
    quiz,
    score: Math.round(score),
    total: Math.round(total),
    seconds: Math.round(seconds),
    at: new Date().toISOString(),
  };
}
