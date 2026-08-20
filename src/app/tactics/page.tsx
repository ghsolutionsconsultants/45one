import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import { formations, phases } from "@/lib/formations";
import TacticsBoard from "@/components/TacticsBoard";
import Reveal from "@/components/Reveal";
import { Button, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tactics Board",
  description:
    "An interactive football tactics board: seven formations across five phases of play, with the role types and reference players for every position.",
};

const lanes = [
  { n: "01", t: "Left wing", d: "The touchline. Holding it stretches the opposition back four horizontally and creates the gaps everyone else attacks." },
  { n: "02", t: "Left half space", d: "Between full back and centre back. The hardest area to defend because nobody's marking assignment naturally covers it." },
  { n: "03", t: "Centre", d: "Occupied to pin both centre backs so they cannot step out or drift wide to help." },
  { n: "04", t: "Right half space", d: "The mirror. Most cut-backs and late runs into the box start from one of the two half spaces." },
  { n: "05", t: "Right wing", d: "The other touchline. Width on both sides is what stops a defence squeezing narrow." },
];

const principles = [
  {
    t: "Create a spare man",
    d: "Almost every build-up problem is solved by having one more player than the opposition is pressing with. A pivot dropping in, a full back inverting or a centre back carrying forward all do the same job: force someone to leave their position, which creates the free man somewhere else.",
  },
  {
    t: "Occupy all five lanes",
    d: "If you leave a lane empty, the defender responsible for it is free to help elsewhere. Filling all five forces the back line to stay stretched and stops them doubling up on your best player.",
  },
  {
    t: "Attack with depth, not just width",
    d: "Someone has to threaten the space behind while others hold the ball in front. Without a runner in behind, a defence simply steps up and squeezes the pitch until there is no room left to play in.",
  },
  {
    t: "Keep a rest defence",
    d: "The structure you leave behind the ball while attacking decides whether you concede on the counter. Three defenders and two midfielders is the standard, and it is why the back three steps to halfway rather than staying home.",
  },
  {
    t: "Win it back in six seconds, or drop",
    d: "The counter-press works because a team that has just won the ball is at its most disorganised. If the press does not work quickly, the shape has to reset rather than chase.",
  },
];

export default function TacticsPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.pitchAerial}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/88 to-ink" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Eyebrow>Interactive</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.86] tracking-tight">
            THE TACTICS
            <br />
            <span className="text-volt">BOARD.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">
            Seven formations across five phases of play. Switch the phase and the
            players move, because a shape on a teamsheet and a shape on the pitch
            are two different things. Tap any player for their role types and the
            job they are actually being asked to do.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-mute">
            <span>{formations.length} formations</span>
            <span className="text-volt">·</span>
            <span>{phases.length} views</span>
            <span className="text-volt">·</span>
            <span>Every position explained</span>
          </div>
        </div>
      </section>

      {/* ---------- THE BOARD ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <TacticsBoard />
      </section>

      {/* ---------- FIVE LANES ---------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="The key principle"
              title="Five lanes."
              sub="Modern attacking play is built on dividing the pitch into five vertical lanes and occupying all of them. It is why 3-2-5 and 2-3-5 turn up again and again at the top level, whatever the formation says on paper."
            />
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {lanes.map((l) => (
              <div key={l.n} className="bg-ink p-6">
                <p className="font-display text-3xl text-volt/40">{l.n}</p>
                <h3 className="mt-4 font-display text-lg tracking-tight">{l.t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-mute">{l.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PHASES ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The phases"
            title="One team, five shapes."
            sub="A side does not hold one formation for ninety minutes. It moves between these five states, sometimes several times in a single passage of play."
          />
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {phases.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <div className="h-full rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-volt">
                  {p.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mute">{p.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- PRINCIPLES ---------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Principles"
              title="What every shape is trying to do."
              sub="Formations are the vocabulary. These are the sentences."
            />
          </Reveal>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-line bg-ink p-6 sm:p-8">
                  <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FORMATION INDEX ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading eyebrow="The shapes" title="Seven formations, honestly assessed." />
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {formations.map((f) => (
            <div key={f.id} className="bg-ink p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-3xl tracking-tight text-volt">
                  {f.name}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.18em] text-mute">
                  {f.nickname}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mute">{f.summary}</p>
              <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-volt">
                    Strength
                  </dt>
                  <dd className="mt-1 text-bone/80">{f.strength}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-mute">
                    Weakness
                  </dt>
                  <dd className="mt-1 text-bone/80">{f.weakness}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:px-8 md:py-20">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Think you know the game?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-mute sm:text-base">
            Five rounds, forty questions, and a leaderboard to settle it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/quiz">Take the quiz</Button>
            <Link
              href="/podcast"
              className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-volt hover:text-volt sm:px-7 sm:py-3.5"
            >
              Watch the podcast
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
