"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import { LeagueCode, useDeadline } from "./FplJoin";

/** Homepage band pointing at the FPL mini-league. */
export default function FplCallout() {
  const left = useDeadline();

  const cells = [
    { v: left?.days, l: "Days" },
    { v: left?.hours, l: "Hrs" },
    { v: left?.mins, l: "Min" },
    { v: left?.secs, l: "Sec" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line sm:rounded-3xl">
      <Image
        src={img.stadiumNight}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 80vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/92 via-ink/85 to-ink/95" />

      <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:p-12">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-volt">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
            </span>
            Fantasy Premier League · {site.fpl.season}
          </p>

          <h3 className="mt-4 font-display text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
            JOIN THE 45ONE
            <br />
            <span className="text-volt">PREMIER LEAGUE.</span>
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-bone/75 sm:text-base">
            Our mini-league is free and open to every listener. 38 gameweeks,
            one winner, and a season of proving your football opinions actually
            hold up.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
            <a
              href={site.fpl.joinUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-volt px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
            >
              Join the league
            </a>
            <Link
              href="/fpl"
              className="rounded-full border border-line bg-ink/40 px-6 py-3 text-sm font-bold backdrop-blur-sm transition hover:border-volt hover:text-volt"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-line bg-ink/70 p-5 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.22em] text-mute">
            League code
          </p>
          <div className="mt-2.5">
            <LeagueCode size="sm" />
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-mute">
            {left?.over ? "Gameweek 1 has kicked off" : "Gameweek 1 deadline"}
          </p>

          {left?.over ? (
            <p className="mt-2 text-sm leading-relaxed text-mute">
              Still open. Late entries start from the gameweek they join.
            </p>
          ) : (
            <div className="mt-2.5 grid grid-cols-4 gap-1.5">
              {cells.map((c) => (
                <div
                  key={c.l}
                  className="min-w-0 rounded-lg border border-line bg-ink px-1 py-2.5 text-center"
                >
                  <p className="font-display text-xl leading-none tracking-tight text-volt tabular-nums sm:text-2xl">
                    {left ? String(c.v).padStart(2, "0") : "--"}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-mute">
                    {c.l}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
