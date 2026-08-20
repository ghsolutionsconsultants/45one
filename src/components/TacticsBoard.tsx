"use client";

import { useMemo, useState } from "react";
import { formations, phases, type PhaseId, type Spot } from "@/lib/formations";

export default function TacticsBoard() {
  const [active, setActive] = useState(formations[0]);
  const [phase, setPhase] = useState<PhaseId>("buildUp");
  const [selected, setSelected] = useState<number | null>(null);

  const phaseMeta = phases.find((p) => p.id === phase)!;
  const notes = active.phaseNotes[phase];

  // player positions for the current phase
  const positions = useMemo(() => {
    const shift = active.shifts[phase] ?? {};
    return active.spots.map((s, i) => ({ ...s, ...(shift[i] ?? {}) }));
  }, [active, phase]);

  const player: Spot | null = selected === null ? null : active.spots[selected];
  const job = player?.jobs[phase];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 sm:rounded-3xl">
      {/* ---------- formation switcher ---------- */}
      <div className="flex gap-2 overflow-x-auto border-b border-line p-2.5 sm:p-3">
        {formations.map((f) => {
          const on = f.id === active.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                setActive(f);
                setSelected(null);
              }}
              className={`shrink-0 rounded-full px-4 py-2 font-display text-base tracking-wide transition sm:px-5 sm:py-2.5 sm:text-lg ${
                on
                  ? "bg-volt text-black"
                  : "border border-line text-bone/70 hover:border-volt hover:text-volt"
              }`}
            >
              {f.name}
            </button>
          );
        })}
      </div>

      {/* ---------- phase switcher ---------- */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-line bg-ink/40 p-2.5 sm:gap-2 sm:p-3">
        {phases.map((p) => {
          const on = p.id === phase;
          return (
            <button
              key={p.id}
              onClick={() => setPhase(p.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] transition sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em] ${
                on
                  ? "bg-volt/15 text-volt ring-1 ring-volt/50"
                  : "text-mute hover:text-bone"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        {/* ---------------- pitch ---------------- */}
        <div className="relative border-b border-line p-3 sm:p-4 lg:border-b-0 lg:border-r">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-volt">
              {notes.shape}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Tap a player
            </p>
          </div>

          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#0a1a0d] sm:rounded-2xl">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 8%, transparent 8% 16%)",
              }}
            />
            <svg
              viewBox="0 0 100 62"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.35">
                <rect x="2" y="2" width="96" height="58" />
                <line x1="50" y1="2" x2="50" y2="60" />
                <circle cx="50" cy="31" r="9" />
                <rect x="2" y="14" width="12" height="34" />
                <rect x="2" y="23" width="5" height="16" />
                <rect x="86" y="14" width="12" height="34" />
                <rect x="93" y="23" width="5" height="16" />
              </g>
              <circle cx="50" cy="31" r="0.7" fill="rgba(255,255,255,0.4)" />
            </svg>

            {positions.map((s, i) => {
              const on = selected === i;
              const involved = Boolean(active.spots[i].jobs[phase]);
              return (
                <button
                  key={`${active.id}-${i}`}
                  onClick={() => setSelected(on ? null : i)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  aria-label={`${s.role}, ${phaseMeta.label}`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border font-display text-[8px] tracking-tight transition sm:h-12 sm:w-12 sm:border-2 sm:text-[11px] ${
                      on
                        ? "scale-110 border-volt bg-volt text-black"
                        : involved
                          ? "border-volt/70 bg-ink/85 text-volt group-hover:scale-110 group-hover:bg-volt group-hover:text-black"
                          : "border-line bg-ink/70 text-bone/45 group-hover:border-volt/60"
                    }`}
                  >
                    {s.short}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-mute">
            {phaseMeta.blurb}
          </p>
        </div>

        {/* ---------------- detail ---------------- */}
        <div className="flex flex-col p-5 sm:p-7 md:p-9">
          {player ? (
            <div className="animate-rise">
              <button
                onClick={() => setSelected(null)}
                className="text-[10px] uppercase tracking-[0.25em] text-mute hover:text-volt"
              >
                ← Back to the shape
              </button>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-4xl leading-none text-volt sm:text-5xl">
                  {player.short}
                </span>
                <h3 className="font-display text-lg tracking-tight sm:text-xl">
                  {player.role}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-mute">{player.note}</p>

              <div className="mt-6 rounded-xl border border-volt/25 bg-volt/[0.05] p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
                  In the {phaseMeta.label.toLowerCase()} phase
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bone/90">
                  {job ?? "Not a defining role in this phase. They hold their position and stay available."}
                </p>
              </div>

              <div className="mt-7">
                <p className="text-[10px] uppercase tracking-[0.22em] text-mute">
                  Role types
                </p>
                <ul className="mt-3 flex flex-col gap-3">
                  {player.variants.map((v) => (
                    <li key={v.name} className="border-l-2 border-line pl-3.5">
                      <p className="text-sm font-semibold text-bone">{v.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-mute">
                        {v.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-line pt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-mute">
                  Players who define it
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {player.players.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-bone/85"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-rise">
              <p className="text-[10px] uppercase tracking-[0.25em] text-volt">
                {active.nickname}
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                <h3 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
                  {active.name}
                </h3>
                <span className="rounded-full border border-volt/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-volt">
                  {notes.shape}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-mute">{active.summary}</p>

              <div className="mt-6 rounded-xl border border-volt/25 bg-volt/[0.05] p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
                  {phaseMeta.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bone/90">
                  {notes.detail}
                </p>
              </div>

              <dl className="mt-7 flex flex-col gap-5 border-t border-line pt-5">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-volt">
                    Strength
                  </dt>
                  <dd className="mt-1.5 text-sm text-bone/85">{active.strength}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-mute">
                    Weakness
                  </dt>
                  <dd className="mt-1.5 text-sm text-bone/85">{active.weakness}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
