"use client";

import { useEffect, useMemo, useState } from "react";
import type { Standing } from "@/lib/fpl";

const INITIAL = 15;
const PIN_KEY = "45one-fpl-pin";

/** Tiny bar chart of a manager's gameweek scores. */
function Form({ points, max }: { points: number[]; max: number }) {
  if (!points.length) return null;
  const recent = points.slice(-6);

  return (
    <span className="flex h-6 items-end gap-[3px]" aria-hidden>
      {recent.map((p, i) => (
        <span
          key={i}
          className={`w-1.5 rounded-sm ${
            i === recent.length - 1 ? "bg-volt" : "bg-bone/25"
          }`}
          style={{ height: `${Math.max(12, (p / max) * 100)}%` }}
        />
      ))}
    </span>
  );
}

function Movement({ rank, lastRank }: { rank: number; lastRank?: number }) {
  if (!lastRank || lastRank === 0) return null;
  const delta = lastRank - rank;

  if (delta === 0) {
    return <span className="text-[10px] text-mute">–</span>;
  }
  return (
    <span
      className={`text-[10px] font-bold tabular-nums ${
        delta > 0 ? "text-volt" : "text-red-400/80"
      }`}
    >
      {delta > 0 ? "▲" : "▼"}
      {Math.abs(delta)}
    </span>
  );
}

export default function Standings({
  standings,
  updatedAt,
  live,
  form = {},
}: {
  standings: Standing[];
  updatedAt: string;
  live: boolean;
  form?: Record<string, number[]>;
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState<string | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        setPinned(localStorage.getItem(PIN_KEY));
      } catch {
        /* storage blocked */
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  function togglePin(key: string) {
    const next = pinned === key ? null : key;
    setPinned(next);
    try {
      if (next) localStorage.setItem(PIN_KEY, next);
      else localStorage.removeItem(PIN_KEY);
    } catch {
      /* storage blocked */
    }
  }

  const leaderTotal = standings[0]?.total ?? 0;
  const maxGw = useMemo(
    () => Math.max(40, ...Object.values(form).flat()),
    [form]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return standings;
    return standings.filter(
      (s) =>
        s.team.toLowerCase().includes(q) || s.manager.toLowerCase().includes(q)
    );
  }, [query, standings]);

  const searching = query.trim().length > 0;
  const base = searching || expanded ? filtered : filtered.slice(0, INITIAL);

  // A pinned team stays visible even when it sits outside the top 15
  const pinnedRow = pinned
    ? filtered.find((s) => `${s.team}|${s.manager}` === pinned)
    : undefined;
  const visible =
    pinnedRow && !base.includes(pinnedRow) ? [...base, pinnedRow] : base;
  const hidden = filtered.length - base.length;

  const stamp = new Date(updatedAt).toLocaleString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Johannesburg",
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Find your team</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your team or name"
            className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-base text-bone outline-none transition placeholder:text-mute focus:border-volt sm:text-sm"
          />
        </label>
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-mute">
          {live && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
            </span>
          )}
          Updated {stamp}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-[2.6rem_1fr_2.6rem_3.4rem] gap-2 border-b border-line bg-ink-2 px-3 py-3 text-[10px] uppercase tracking-[0.15em] text-mute sm:grid-cols-[3.5rem_1fr_5rem_4rem_5rem_5rem] sm:px-6">
          <span>Rank</span>
          <span>Team &amp; manager</span>
          <span className="hidden sm:block">Form</span>
          <span className="text-right">GW</span>
          <span className="hidden text-right sm:block">Behind</span>
          <span className="text-right">Total</span>
        </div>

        {visible.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-mute">
            Nobody by that name. Check the spelling, or join with the code above.
          </p>
        )}

        {visible.map((s) => {
          const key = `${s.team}|${s.manager}`;
          const isPinned = pinned === key;
          const behind = leaderTotal - s.total;

          return (
            <div
              key={key}
              onClick={() => togglePin(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePin(key);
                }
              }}
              className={`grid cursor-pointer grid-cols-[2.6rem_1fr_2.6rem_3.4rem] items-center gap-2 border-b border-line/50 px-3 py-3.5 transition last:border-0 hover:bg-ink-3 sm:grid-cols-[3.5rem_1fr_5rem_4rem_5rem_5rem] sm:px-6 ${
                isPinned
                  ? "bg-volt/[0.09] ring-1 ring-inset ring-volt/40"
                  : s.rank === 1
                    ? "bg-volt/[0.05]"
                    : ""
              }`}
            >
              <span className="flex items-baseline gap-1.5">
                <span
                  className={`font-display text-lg ${
                    s.rank === 1
                      ? "text-volt"
                      : s.rank <= 3
                        ? "text-bone"
                        : "text-mute"
                  }`}
                >
                  {s.rank}
                </span>
                <Movement rank={s.rank} lastRank={s.lastRank} />
              </span>

              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-bone">
                    {s.team}
                  </span>
                  {isPinned && (
                    <span className="shrink-0 rounded-full bg-volt px-1.5 py-0.5 text-[9px] font-bold uppercase text-black">
                      You
                    </span>
                  )}
                </span>
                <span className="block truncate text-xs text-mute">
                  {s.manager}
                </span>
              </span>

              <span className="hidden sm:block">
                <Form points={form[String(s.entry)] ?? []} max={maxGw} />
              </span>

              <span className="text-right text-sm text-mute tabular-nums">
                {s.gw}
              </span>

              <span className="hidden text-right text-sm tabular-nums sm:block">
                {behind === 0 ? (
                  <span className="text-volt">Lead</span>
                ) : (
                  <span className="text-mute">-{behind}</span>
                )}
              </span>

              <span className="text-right font-display text-lg text-volt tabular-nums">
                {s.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {!searching && hidden > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-volt hover:text-volt"
          >
            Show all {filtered.length} managers
          </button>
        )}
        {!searching && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-volt hover:text-volt"
          >
            Show top {INITIAL} only
          </button>
        )}
        <p className="text-xs text-mute">
          {pinned ? "Tap your row again to unpin it." : "Tap your row to pin it to the table."}
        </p>
      </div>
    </div>
  );
}
