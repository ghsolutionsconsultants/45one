import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getStandings, getLeagueStats, teamOfTheWeek } from "@/lib/fpl";
import TeamOfTheWeek from "@/components/TeamOfTheWeek";
import RaceChart from "@/components/RaceChart";
import Podium from "@/components/Podium";
import LeagueAwards from "@/components/LeagueAwards";
import { img } from "@/lib/images";
import FplJoin from "@/components/FplJoin";
import Standings from "@/components/Standings";
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
    d: "The league stays open all season. Late joiners keep the points they have scored from the gameweek they entered, which is why a few totals near the bottom look light.",
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

export const revalidate = 1800;

export default async function FplPage() {
  const table = await getStandings();
  const managerCount = table.standings.length;
  const leader = table.standings[0];
  const stats = getLeagueStats(table.standings);

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
                {managerCount} managers, one table, and a season of proving your
                football opinions actually hold up. {leader.manager} leads on{" "}
                {leader.total} points. Still open to every 451 listener.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-mute">
                <span>{managerCount} managers</span>
                <span className="text-volt">·</span>
                <span>38 gameweeks</span>
                <span className="text-volt">·</span>
                <span>Free to enter</span>
              </div>

              <a
                href="#standings"
                className="mt-7 inline-flex rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-volt hover:text-volt"
              >
                Jump to the table
              </a>
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

      {/* ---------- STANDINGS ---------- */}
      <section id="standings" className="scroll-mt-24 border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Standings"
              title="The table."
              sub={`${managerCount} managers deep and counting. Search for your team to find yourself, or scroll the whole league.`}

            />
          </Reveal>
          <div className="mb-8">
            <Podium standings={table.standings} />
          </div>

          <Standings
            standings={table.standings}
            updatedAt={table.updatedAt}
            live={table.live}
            form={stats.form}
          />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-mute">
              Ranks are exactly as Fantasy Premier League reports them, ties
              included. Managers who joined late score from the gameweek they
              entered, which is why a few totals sit well below the pack.
            </p>
            <a
              href={site.fpl.tableUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-xs uppercase tracking-[0.18em] text-volt hover:underline"
            >
              Open on FPL →
            </a>
          </div>
        </div>
      </section>

      {/* ---------- LEAGUE STATS ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={stats.gameweek ? `After gameweek ${stats.gameweek}` : "The numbers"}
            title="League stats."
            sub="Updated with the table, every gameweek, all season."
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              v: stats.managerOfTheWeek?.value ?? 0,
              l: "Manager of the week",
              d: stats.managerOfTheWeek?.team ?? "",
              sub: stats.managerOfTheWeek?.manager ?? "",
            },
            {
              v: stats.averageGw,
              l: "League average this week",
              d: `${stats.averageTotal} average total`,
              sub: `${stats.medianTotal} median`,
            },
            {
              v: stats.seasonBest?.value ?? 0,
              l: "Best gameweek so far",
              d: stats.seasonBest?.team ?? "",
              sub: stats.seasonBest?.note ?? "",
            },
            {
              v: stats.spread,
              l: "Points top to bottom",
              d: `${stats.chasingPack} within 20 of the lead`,
              sub: `${managerCount} managers`,
            },
          ].map((c) => (
            <div key={c.l} className="bg-ink p-6">
              <p className="font-display text-4xl leading-none text-volt sm:text-5xl">
                {c.v}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-mute">
                {c.l}
              </p>
              <p className="mt-2 truncate text-sm text-bone">{c.d}</p>
              <p className="truncate text-xs text-mute">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Reveal>
            <RaceChart race={stats.race} />
          </Reveal>
        </div>

        {stats.gameweekWinners.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-ink-2">
            <p className="border-b border-line px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-volt sm:px-6">
              Gameweek winners
            </p>
            <div className="flex gap-3 overflow-x-auto p-4 sm:p-5">
              {[...stats.gameweekWinners].reverse().map((w) => (
                <div
                  key={w.event}
                  className="w-44 shrink-0 rounded-xl border border-line bg-ink p-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-mute">
                    Gameweek {w.event}
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-bone">
                    {w.team}
                  </p>
                  <p className="truncate text-xs text-mute">{w.manager}</p>
                  <p className="mt-3 font-display text-2xl leading-none text-volt">
                    {w.points}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {teamOfTheWeek && (
          <div className="mt-6">
            <Reveal>
              <TeamOfTheWeek totw={teamOfTheWeek} />
            </Reveal>
          </div>
        )}
      </section>

      {/* ---------- AWARDS ---------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Awards"
              title="Running all season."
              sub="Every category updates with the table. No prizes, just receipts."
            />
          </Reveal>
          <LeagueAwards stats={stats} />
        </div>
      </section>

      {/* ---------- QUARTERS ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The season in four"
            title="Quarter by quarter."
            sub="The league splits into four blocks. Win a quarter and you have something to talk about even if the title has gone."
          />
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.quarters.map((q) => (
            <div
              key={q.label}
              className={`rounded-2xl border p-6 ${
                q.played > 0 ? "border-line bg-ink-2" : "border-line/60 bg-ink"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-xl tracking-tight">{q.label}</h3>
                <span className="text-[10px] uppercase tracking-[0.15em] text-mute">
                  {q.range}
                </span>
              </div>

              {q.played === 0 ? (
                <p className="mt-4 text-sm text-mute">Not played yet.</p>
              ) : (
                <ol className="mt-4 flex flex-col gap-2.5">
                  {q.leaders.map((e, i) => (
                    <li key={e.team} className="flex items-baseline gap-2.5">
                      <span
                        className={`w-3 shrink-0 font-display text-sm ${
                          i === 0 ? "text-volt" : "text-mute"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-bone">
                        {e.team}
                      </span>
                      <span
                        className={`shrink-0 font-display text-base tabular-nums ${
                          i === 0 ? "text-volt" : "text-bone/70"
                        }`}
                      >
                        {e.value}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
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
