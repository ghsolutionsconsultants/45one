import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import { quizzes } from "@/lib/quizzes";
import QuizWithBoard from "@/components/QuizWithBoard";
import Reveal from "@/components/Reveal";
import { Button, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Football IQ Quiz",
  description:
    "Five rounds of football questions: tactics, Premier League history, legends, stats and the PSL. Every answer comes with the reasoning, and there is a leaderboard.",
};

const totalQuestions = quizzes.reduce((n, q) => n + q.questions.length, 0);

export default function QuizPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.ballCloseup}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Eyebrow>Test yourself</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.86] tracking-tight">
            FOOTBALL
            <br />
            <span className="text-volt">IQ.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">
            {quizzes.length} rounds, {totalQuestions} questions, and an
            explanation after every answer. Get a score up on the board and see
            where you land.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-mute">
            <span>{quizzes.length} rounds</span>
            <span className="text-volt">·</span>
            <span>{totalQuestions} questions</span>
            <span className="text-volt">·</span>
            <span>Leaderboard</span>
          </div>
        </div>
      </section>

      {/* ---------- QUIZ + BOARD ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <QuizWithBoard />
      </section>

      {/* ---------- ROUNDS ---------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="The rounds"
              title="Five ways to be wrong."
              sub="Each round is eight questions. The reasoning matters more than the score, which is the whole point."
            />
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q) => (
              <div key={q.id} className="bg-ink p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-tight">{q.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-mute">
                    {q.questions.length} Qs
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {q.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW SCORING WORKS ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading eyebrow="The rules" title="How the board works." />
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {[
            {
              t: "Score comes first",
              d: "Ranking is by accuracy: how many you got right out of the round you played. A perfect eight beats a seven every time.",
            },
            {
              t: "Then the clock",
              d: "The timer runs from the first question to the last. Ties are split by the faster run, so guessing quickly is a genuine risk.",
            },
            {
              t: "One name, any round",
              d: "Play any of the five rounds and put your name up. The board shows which round each score came from.",
            },
          ].map((r, i) => (
            <Reveal key={r.t} delay={i * 70}>
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
      <section className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:px-8 md:py-20">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Want the answers explained properly?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-mute sm:text-base">
            The tactics board breaks down the shapes behind half these questions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/tactics">Open the tactics board</Button>
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
