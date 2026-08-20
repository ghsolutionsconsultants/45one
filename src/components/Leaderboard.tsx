"use client";

import { useCallback, useEffect, useState } from "react";

export type Entry = {
  name: string;
  quiz: string;
  score: number;
  total: number;
  seconds: number;
  at: string;
};

const LOCAL_KEY = "45one-leaderboard-local";

function readLocal(): Entry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Entry[]) : [];
  } catch {
    return [];
  }
}

export function saveLocal(entry: Entry) {
  try {
    const all = [...readLocal(), entry]
      .sort(
        (a, b) =>
          b.score / b.total - a.score / a.total || a.seconds - b.seconds
      )
      .slice(0, 25);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
  } catch {
    /* storage blocked */
  }
}

function time(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}

export default function Leaderboard({ refreshKey = 0 }: { refreshKey?: number }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [global, setGlobal] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard", { cache: "no-store" });
      const json = (await res.json()) as { configured: boolean; entries: Entry[] };
      if (json.configured) {
        setGlobal(true);
        setEntries(json.entries);
        return;
      }
    } catch {
      /* fall through to the local board */
    }
    setGlobal(false);
    setEntries(readLocal());
  }, []);

  useEffect(() => {
    // A timeout rather than requestAnimationFrame: browsers pause rAF in
    // background tabs, which left the table stuck on "Loading" until the tab
    // was looked at. Timeouts are throttled there, but they still fire.
    const id = setTimeout(() => void load(), 0);
    return () => clearTimeout(id);
  }, [load, refreshKey]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
          {global ? "Leaderboard" : "Your scores"}
        </p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-mute">
          {global ? "Top 25" : "This device"}
        </p>
      </div>

      <div className="grid grid-cols-[2.2rem_1fr_3.2rem_3.6rem] gap-2 border-b border-line px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] text-mute sm:grid-cols-[3rem_1fr_1fr_4rem_5rem] sm:px-6">
        <span>#</span>
        <span>Name</span>
        <span className="hidden sm:block">Round</span>
        <span className="text-right">Score</span>
        <span className="text-right">Time</span>
      </div>

      {entries === null && (
        <p className="px-5 py-8 text-center text-sm text-mute">Loading…</p>
      )}

      {entries?.length === 0 && (
        <p className="px-5 py-10 text-center text-sm text-mute">
          Nobody on the board yet. Play a round and put your name up first.
        </p>
      )}

      {entries?.map((e, i) => (
        <div
          key={`${e.name}-${e.at}-${i}`}
          className="grid grid-cols-[2.2rem_1fr_3.2rem_3.6rem] items-center gap-2 border-b border-line/50 px-4 py-3 last:border-0 sm:grid-cols-[3rem_1fr_1fr_4rem_5rem] sm:px-6"
        >
          <span
            className={`font-display text-lg ${
              i === 0 ? "text-volt" : i < 3 ? "text-bone" : "text-mute"
            }`}
          >
            {i + 1}
          </span>
          <span className="truncate text-sm text-bone">{e.name}</span>
          <span className="hidden truncate text-xs text-mute sm:block">
            {e.quiz}
          </span>
          <span className="text-right text-sm font-semibold text-volt tabular-nums">
            {e.score}/{e.total}
          </span>
          <span className="text-right text-xs text-mute tabular-nums">
            {time(e.seconds)}
          </span>
        </div>
      ))}

      {!global && entries !== null && (
        <p className="border-t border-line px-5 py-4 text-xs leading-relaxed text-mute">
          Scores are saved on this device only. The shared leaderboard switches
          on once a store is connected.
        </p>
      )}
    </div>
  );
}
