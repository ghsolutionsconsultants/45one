import type { TotwPlayer, TeamOfTheWeek as Totw } from "@/lib/fpl";

const ROWS: { key: string; label: string }[] = [
  { key: "GKP", label: "Goalkeeper" },
  { key: "DEF", label: "Defence" },
  { key: "MID", label: "Midfield" },
  { key: "FWD", label: "Attack" },
];

function Shirt({ player }: { player: TotwPlayer }) {
  const badge = player.captain ? "C" : player.viceCaptain ? "V" : null;
  const big = player.points >= 10;

  return (
    <div className="flex w-[4.4rem] flex-col items-center sm:w-24">
      <div className="relative">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg border text-[10px] font-bold sm:h-12 sm:w-12 sm:text-xs ${
            big
              ? "border-volt bg-volt text-black"
              : "border-line bg-ink text-bone/80"
          }`}
        >
          {player.club}
        </div>
        {badge && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-volt bg-ink text-[9px] font-bold text-volt">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-1.5 w-full truncate text-center text-[10px] font-medium text-bone sm:text-xs">
        {player.name}
      </p>
      <p
        className={`text-[10px] font-bold tabular-nums sm:text-xs ${
          big ? "text-volt" : "text-mute"
        }`}
      >
        {player.points}
        {player.multiplier > 1 && (
          <span className="ml-0.5 font-normal text-mute">
            ×{player.multiplier}
          </span>
        )}
      </p>
    </div>
  );
}

export default function TeamOfTheWeek({ totw }: { totw: Totw }) {
  const starters = totw.players.filter((p) => !p.bench);
  const bench = totw.players.filter((p) => p.bench);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
      <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
            Team of the week · GW {totw.gw}
          </p>
          <h3 className="mt-2 truncate font-display text-2xl tracking-tight sm:text-3xl">
            {totw.team}
          </h3>
          <p className="mt-1 truncate text-sm text-mute">{totw.manager}</p>
        </div>
        <div className="flex shrink-0 items-center gap-5">
          {totw.chip && (
            <span className="rounded-full border border-volt/40 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-volt">
              {totw.chip}
            </span>
          )}
          <div className="text-right">
            <p className="font-display text-4xl leading-none text-volt sm:text-5xl">
              {totw.points}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-mute">
              Points
            </p>
          </div>
        </div>
      </div>

      {/* pitch */}
      <div className="relative bg-[#0a1a0d] p-4 sm:p-6">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.035) 0 8%, transparent 8% 16%)",
          }}
        />
        <svg
          viewBox="0 0 100 130"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.4">
            <rect x="2" y="2" width="96" height="126" />
            <line x1="2" y1="65" x2="98" y2="65" />
            <circle cx="50" cy="65" r="14" />
            <rect x="26" y="2" width="48" height="18" />
            <rect x="26" y="110" width="48" height="18" />
          </g>
        </svg>

        <div className="relative flex flex-col gap-5 sm:gap-7">
          {ROWS.map((row) => {
            const line = starters.filter((p) => p.position === row.key);
            if (!line.length) return null;
            return (
              <div
                key={row.key}
                className="flex flex-wrap items-start justify-center gap-x-2 gap-y-4 sm:gap-x-5"
              >
                {line.map((p) => (
                  <Shirt key={`${p.name}-${p.order}`} player={p} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* bench */}
      {bench.length > 0 && (
        <div className="border-t border-line p-4 sm:p-6">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-mute">
              Bench
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-mute">
              {totw.bench} left on it
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-4 sm:justify-start sm:gap-x-5">
            {bench.map((p) => (
              <Shirt key={`${p.name}-${p.order}`} player={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
