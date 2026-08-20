import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import FplJoin from "@/components/FplJoin";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "FPL League",
  description: `Join the ${site.fpl.leagueName}, the 45one Fantasy Premier League mini-league for the ${site.fpl.season} season. League code ${site.fpl.code}.`,
};

const steps = [
  {
    n: "01",
    t: "Get an FPL account",
    d: "Sign up free on the Fantasy Premier League app or at fantasy.premierleague.com, then pick your squad within the £100m budget.",
  },
  {
    n: "02",
    t: "Open Leagues & Cups",
    d: "From your team page, go to the Leagues & Cups tab and choose Join a league or cup, then Join private league.",
  },
  {
    n: "03",
    t: "Enter the code",
    d: `Type ${site.fpl.code} and confirm. You will see the 45one Premier League in your list, and you are in for the season.`,
  },
];

const rules = [
  {
    t: "38 gameweeks, one winner",
    d: "Standard FPL scoring across the full season. Highest total on the final gameweek takes it, no playoffs and no resets.",
  },
  {
    t: "Join whenever you like",
    d: "The league stays open all season. Late joiners keep the points they have scored from the gameweek they entered, so joining now is the fairest start.",
  },
  {
    t: "Settled on the podcast",
    d: "Standings get discussed on the pod through the season, and the winner gets their moment on the show. Bragging rights are the prize.",
  },
  {
    t: "Everyone is welcome",
    d: "Listeners, chirpers, first-timers and the person who has done this for fifteen years. No entry fee, no requirements.",
  },
];

export default function FplPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.stadiumAerial}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/88 to-ink" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="min-w-0">
              <Eyebrow>Fantasy Premier League · {site.fpl.season}</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.86] tracking-tight">
                45ONE
                <br />
                <span className="text-volt">PREMIER LEAGUE.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/75 sm:text-lg">
                Our mini-league is open to every 451 listener. Pick a squad,
                join with the code, and spend the season proving your football
                opinions actually hold up.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-mute">
                <span>38 gameweeks</span>
                <span className="text-volt">·</span>
                <span>One winner</span>
                <span className="text-volt">·</span>
                <span>Free to enter</span>
              </div>
            </div>

            <div className="min-w-0">
              <FplJoin />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW TO JOIN ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="How to join"
            title="Three steps, two minutes."
            sub="If you have never played fantasy before, this is the whole process."
          />
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-ink p-6 sm:p-8 md:p-10">
              <p className="font-display text-4xl text-volt/40">{s.n}</p>
              <h3 className="mt-5 font-display text-xl tracking-tight sm:text-2xl">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- STANDINGS PLACEHOLDER ---------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Standings"
              title="The table lands after gameweek 1."
              sub="Once the season is under way, the live league table will live right here: rank, gameweek points, total, and the movers."
            />
          </Reveal>

          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-[3rem_1fr_4rem_4.5rem] gap-2 border-b border-line bg-ink px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-mute sm:grid-cols-[4rem_1fr_6rem_6rem] sm:px-6">
              <span>Rank</span>
              <span>Manager</span>
              <span className="text-right">GW</span>
              <span className="text-right">Total</span>
            </div>

            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="grid grid-cols-[3rem_1fr_4rem_4.5rem] items-center gap-2 border-b border-line/60 px-4 py-4 last:border-0 sm:grid-cols-[4rem_1fr_6rem_6rem] sm:px-6"
              >
                <span className="font-display text-lg text-volt/30">{n}</span>
                <span className="h-3 w-2/3 rounded-full bg-line" />
                <span className="ml-auto h-3 w-8 rounded-full bg-line" />
                <span className="ml-auto h-3 w-10 rounded-full bg-line" />
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-mute">
            Join before the deadline and your name is on this table from the
            first gameweek.
          </p>
        </div>
      </section>

      {/* ---------- RULES ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading eyebrow="How it works" title="The house rules." />
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {rules.map((r, i) => (
            <Reveal key={r.t} delay={i * 80}>
              <div className="h-full rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
                <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                  {r.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden border-t border-line bg-volt text-black">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center md:px-8 md:py-20">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/60">
            League code
          </p>
          <p className="mt-4 font-mono text-4xl tracking-[0.3em] sm:text-6xl">
            {site.fpl.code}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-black/70 sm:text-base">
            Get your squad in before the deadline. Then come and tell us why
            your captain pick was obvious all along.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={site.fpl.joinUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-volt transition hover:bg-ink-3"
            >
              Join the league
            </a>
            <Link
              href="/podcast"
              className="rounded-full border border-black/25 px-7 py-3.5 text-sm font-bold transition hover:border-black"
            >
              Watch the podcast
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
