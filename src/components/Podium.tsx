import type { Standing } from "@/lib/fpl";

/** Top three, with the leader given the space FPL never gives them. */
export default function Podium({ standings }: { standings: Standing[] }) {
  const [first, second, third] = standings;
  if (!first) return null;

  const rest = [second, third].filter(Boolean);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl border border-volt/40 bg-volt/[0.06] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-volt/15 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.25em] text-volt">
            League leader
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {first.team}
          </h3>
          <p className="mt-2 text-sm text-mute">{first.manager}</p>

          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-3">
            <div>
              <p className="font-display text-5xl leading-none text-volt sm:text-6xl">
                {first.total}
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-mute">
                Total points
              </p>
            </div>
            <div>
              <p className="font-display text-2xl leading-none text-bone">
                {first.gw}
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-mute">
                This gameweek
              </p>
            </div>
            {second && (
              <div>
                <p className="font-display text-2xl leading-none text-bone">
                  +{first.total - second.total}
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-mute">
                  Ahead of second
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {rest.map((s) => (
          <div
            key={s.team}
            className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-mute">
                {s.rank === 2 ? "Second" : "Third"}
              </p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-mute">
                -{(standings[0]?.total ?? 0) - s.total} behind
              </p>
            </div>
            <h4 className="mt-3 truncate font-display text-xl tracking-tight sm:text-2xl">
              {s.team}
            </h4>
            <p className="mt-1 truncate text-xs text-mute">{s.manager}</p>
            <p className="mt-4 font-display text-3xl leading-none text-volt">
              {s.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
