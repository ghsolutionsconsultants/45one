import Link from "next/link";
import type { Standing } from "@/lib/fpl";

/** Compact top-five table for the homepage. */
export default function FplHomeTable({
  standings,
  managerCount,
}: {
  standings: Standing[];
  managerCount: number;
}) {
  const top = standings.slice(0, 5);
  const leaderTotal = standings[0]?.total ?? 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
          The table
        </p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-mute">
          Top 5 of {managerCount}
        </p>
      </div>

      {top.map((s) => {
        const behind = leaderTotal - s.total;
        return (
          <div
            key={`${s.team}-${s.manager}`}
            className={`grid grid-cols-[2rem_1fr_3.4rem] items-center gap-3 border-b border-line/50 px-5 py-3.5 last:border-0 ${
              s.rank === 1 ? "bg-volt/[0.06]" : ""
            }`}
          >
            <span
              className={`font-display text-lg ${
                s.rank === 1 ? "text-volt" : "text-mute"
              }`}
            >
              {s.rank}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-bone">
                {s.team}
              </span>
              <span className="block truncate text-xs text-mute">
                {s.manager}
                {behind > 0 && (
                  <span className="ml-2 text-mute/70">-{behind}</span>
                )}
              </span>
            </span>
            <span className="text-right font-display text-lg text-volt tabular-nums">
              {s.total}
            </span>
          </div>
        );
      })}

      <Link
        href="/fpl#standings"
        className="block border-t border-line px-5 py-4 text-center text-xs uppercase tracking-[0.18em] text-mute transition hover:text-volt"
      >
        Full table &amp; league stats →
      </Link>
    </div>
  );
}
