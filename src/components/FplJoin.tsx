"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

function remaining(target: number) {
  const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
    over: s === 0,
  };
}

/** League code with a copy button, plus the countdown to the deadline. */
export default function FplJoin() {
  const target = new Date(site.fpl.deadline).getTime();
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tick = () => setLeft(remaining(target));
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [target]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.fpl.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked, the code is on screen anyway */
    }
  }

  const cells = [
    { v: left?.days, l: "Days" },
    { v: left?.hours, l: "Hours" },
    { v: left?.mins, l: "Mins" },
    { v: left?.secs, l: "Secs" },
  ];

  return (
    <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:rounded-3xl sm:p-8">
      <p className="text-[10px] uppercase tracking-[0.25em] text-mute">
        League code
      </p>

      <button
        onClick={copy}
        className="group mt-3 flex w-full items-center justify-between gap-4 rounded-xl border-2 border-volt bg-ink px-5 py-4 transition hover:bg-volt/10 sm:px-6 sm:py-5"
        aria-label={`Copy league code ${site.fpl.code}`}
      >
        <span className="font-mono text-2xl tracking-[0.3em] text-volt sm:text-4xl">
          {site.fpl.code}
        </span>
        <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-mute transition group-hover:text-volt">
          {copied ? "Copied" : "Tap to copy"}
        </span>
      </button>

      <div className="mt-7">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-mute">
            {left?.over ? "Gameweek 1 has kicked off" : "Gameweek 1 deadline"}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-volt">
            Fri 21 Aug · 19:30
          </p>
        </div>

        {left?.over ? (
          <p className="mt-3 text-sm leading-relaxed text-mute">
            You can still join. Late entries start on zero for the gameweeks
            already played, so the sooner the better.
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-3">
            {cells.map((c) => (
              <div
                key={c.l}
                className="min-w-0 rounded-xl border border-line bg-ink px-1 py-3 text-center sm:px-4 sm:py-4"
              >
                <p className="font-display text-2xl leading-none tracking-tight text-volt tabular-nums sm:text-4xl">
                  {left ? String(c.v).padStart(2, "0") : "--"}
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-[0.15em] text-mute sm:text-[10px]">
                  {c.l}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <a
        href={site.fpl.joinUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex w-full items-center justify-center rounded-full bg-volt px-6 py-3.5 text-sm font-bold text-black transition hover:brightness-110"
      >
        Join the league
      </a>
      <p className="mt-3 text-center text-xs text-mute">
        Opens the FPL site. You need a free Fantasy Premier League account.
      </p>
    </div>
  );
}
