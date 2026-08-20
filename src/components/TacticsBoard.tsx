"use client";

import { useState } from "react";
import { formations, type Spot } from "@/lib/formations";

export default function TacticsBoard() {
  const [active, setActive] = useState(formations[0]);
  const [selected, setSelected] = useState<Spot | null>(null);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-ink-2">
      {/* formation switcher */}
      <div className="flex gap-2 overflow-x-auto border-b border-line p-3">
        {formations.map((f) => {
          const on = f.id === active.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                setActive(f);
                setSelected(null);
              }}
              className={`shrink-0 rounded-full px-5 py-2.5 font-display text-lg tracking-wide transition ${
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

      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        {/* ---------------- pitch ---------------- */}
        <div className="relative border-b border-line p-4 lg:border-b-0 lg:border-r">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0a1a0d] sm:aspect-[16/11]">
            {/* mown stripes */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 8%, transparent 8% 16%)",
              }}
            />
            {/* markings */}
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

            {/* players */}
            {active.spots.map((s, i) => {
              const on = selected?.short === s.short && selected?.y === s.y;
              return (
                <button
                  key={`${active.id}-${i}`}
                  onClick={() => setSelected(on ? null : s)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  aria-label={s.role}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-xs tracking-wide transition sm:h-11 sm:w-11 sm:text-sm ${
                      on
                        ? "scale-110 border-volt bg-volt text-black"
                        : "border-volt/70 bg-ink/85 text-volt group-hover:scale-110 group-hover:bg-volt group-hover:text-black"
                    }`}
                  >
                    {s.short}
                  </span>
                </button>
              );
            })}

            <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.25em] text-bone/40">
              Tap a player
            </p>
          </div>
        </div>

        {/* ---------------- detail ---------------- */}
        <div className="flex flex-col p-7 md:p-9">
          {selected ? (
            <div className="animate-rise">
              <button
                onClick={() => setSelected(null)}
                className="text-xs uppercase tracking-[0.25em] text-mute hover:text-volt"
              >
                ← Back to shape
              </button>
              <p className="mt-7 font-display text-6xl leading-none text-volt">
                {selected.short}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">
                {selected.role}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                {selected.note}
              </p>
            </div>
          ) : (
            <div className="animate-rise">
              <p className="text-xs uppercase tracking-[0.25em] text-volt">
                {active.nickname}
              </p>
              <h3 className="mt-4 font-display text-5xl leading-none tracking-tight">
                {active.name}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-mute">
                {active.summary}
              </p>

              <dl className="mt-8 flex flex-col gap-5 border-t border-line pt-6">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-volt">
                    Strength
                  </dt>
                  <dd className="mt-1.5 text-sm text-bone/85">{active.strength}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-mute">
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
