"use client";

import { useEffect, useState } from "react";

/**
 * Next drop: Thursday 08:00 South African time (SAST is UTC+2, so 06:00 UTC).
 * If it is Thursday before 08:00, it counts down to today's episode.
 */
function nextDrop(): Date {
  const now = new Date();
  const target = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + ((4 - now.getUTCDay() + 7) % 7),
      6,
      0,
      0
    )
  );
  if (target.getTime() <= now.getTime()) {
    target.setUTCDate(target.getUTCDate() + 7);
  }
  return target;
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export default function Countdown() {
  const [left, setLeft] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setLeft(parts(nextDrop().getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: left?.days, l: "Days" },
    { v: left?.hours, l: "Hours" },
    { v: left?.mins, l: "Mins" },
    { v: left?.secs, l: "Secs" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {cells.map((c) => (
        <div
          key={c.l}
          className="rounded-2xl border border-line bg-ink-2/80 px-2 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-5"
        >
          <p className="font-display text-3xl leading-none tracking-tight text-volt tabular-nums sm:text-5xl">
            {left ? String(c.v).padStart(2, "0") : "--"}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-mute">
            {c.l}
          </p>
        </div>
      ))}
    </div>
  );
}
