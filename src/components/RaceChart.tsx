import type { LeagueStats } from "@/lib/fpl";

/**
 * Cumulative points per gameweek for the top eight. FPL shows a table and
 * nothing else, so this is the view that actually tells you who is closing.
 */
export default function RaceChart({ race }: { race: LeagueStats["race"] }) {
  const { events, lines } = race;
  if (events.length < 2 || lines.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-ink-2 p-8 text-center">
        <p className="text-sm text-mute">
          The race chart appears once two gameweeks have been played.
        </p>
      </div>
    );
  }

  const W = 100;
  const H = 52;
  const padL = 3;
  const padR = 18;
  const max = Math.max(...lines.flatMap((l) => l.points));
  const min = 0;

  const x = (i: number) =>
    padL + (i / (events.length - 1)) * (W - padL - padR);
  const y = (v: number) => H - 3 - ((v - min) / (max - min || 1)) * (H - 8);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
            The title race
          </p>
          <h3 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">
            Total points, gameweek by gameweek
          </h3>
        </div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-mute">
          Top {lines.length}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="Cumulative points for the top managers by gameweek"
      >
        {/* horizontal guides */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padL}
            x2={W - padR}
            y1={y(min + f * (max - min))}
            y2={y(min + f * (max - min))}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.15"
          />
        ))}

        {lines.map((line, li) => {
          const d = line.points
            .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p)}`)
            .join(" ");
          const leader = li === 0;
          return (
            <g key={line.team}>
              <path
                d={d}
                fill="none"
                stroke={leader ? "var(--color-volt)" : "rgba(244,244,242,0.30)"}
                strokeWidth={leader ? "0.7" : "0.4"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={x(line.points.length - 1)}
                cy={y(line.points[line.points.length - 1])}
                r={leader ? "0.9" : "0.6"}
                fill={leader ? "var(--color-volt)" : "rgba(244,244,242,0.45)"}
              />
              {li < 3 && (
                <text
                  x={x(line.points.length - 1) + 1.6}
                  y={y(line.points[line.points.length - 1]) + 0.9}
                  className={`max-lg:hidden ${leader ? "fill-volt" : "fill-mute"}`}
                  style={{ fontSize: "2.1px" }}
                >
                  {line.team.length > 14
                    ? `${line.team.slice(0, 13)}…`
                    : line.team}
                </text>
              )}
            </g>
          );
        })}

        {/* gameweek labels */}
        {events.map((e, i) => (
          <text
            key={e}
            x={x(i)}
            y={H - 0.2}
            textAnchor="middle"
            className="fill-mute"
            style={{ fontSize: "1.9px" }}
          >
            GW{e}
          </text>
        ))}
      </svg>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
        {lines.map((line, i) => (
          <li
            key={`legend-${line.team}`}
            className="flex min-w-0 items-center gap-2 text-xs"
          >
            <span
              className={`h-0.5 w-4 shrink-0 rounded-full ${
                i === 0 ? "bg-volt" : "bg-bone/30"
              }`}
            />
            <span className={`truncate ${i === 0 ? "text-volt" : "text-mute"}`}>
              {line.rank}. {line.team}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
