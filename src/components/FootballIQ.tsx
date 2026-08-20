"use client";

import { useState } from "react";

type Question = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

const QUESTIONS: Question[] = [
  {
    q: "A side defends with a back five and two banks ahead of it. What are they accepting in exchange?",
    options: [
      "Losing the midfield battle",
      "Inviting sustained pressure",
      "Conceding the width",
    ],
    answer: 1,
    why: "A low block gives up territory by design. The trade is space for structure: you concede the ball and the half, and you keep the space between your lines too small to play in.",
  },
  {
    q: "Why does a holding midfielder drop between the centre backs at a goal kick?",
    options: [
      "To get on the ball earlier",
      "To create a spare man against the press",
      "To let the full backs defend deeper",
    ],
    answer: 1,
    why: "Two forwards pressing three defenders means one is always free. Building through a spare man is the cleanest way to break a first line of pressure without going long.",
  },
  {
    q: "A winger who plays on the opposite side to their stronger foot is usually there to do what?",
    options: [
      "Hold the touchline and cross",
      "Cut inside to shoot and combine",
      "Track the opposing full back",
    ],
    answer: 1,
    why: "An inverted winger comes inside onto the stronger foot, which opens the shot and the through ball. It also empties the touchline for the full back to overlap into.",
  },
  {
    q: "What is the biggest risk a high defensive line takes on?",
    options: [
      "The ball over the top",
      "Losing aerial duels",
      "Fouling near your own box",
    ],
    answer: 0,
    why: "Squeezing the pitch compresses the space in front of you and leaves grass behind you. It only works with a keeper who sweeps and defenders who can turn and run.",
  },
  {
    q: "In a 3-5-2, which job is usually the most physically demanding?",
    options: ["The holding midfielder", "The wing-back", "The centre backs"],
    answer: 1,
    why: "Wing-backs supply all the width in a 3-5-2. They defend as part of a back five and attack as wingers, which means covering the full flank for ninety minutes.",
  },
];

export default function FootballIQ() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[i];
  const correct = picked === q.answer;

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i === QUESTIONS.length - 1) {
      setDone(true);
      return;
    }
    setI((v) => v + 1);
    setPicked(null);
  }

  function restart() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const verdict =
      score === QUESTIONS.length
        ? "You could take the coaching badges."
        : score >= 3
          ? "Solid. You watch the game properly."
          : "Plenty to build on. That is what the podcast is for.";

    return (
      <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-8 text-center md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-volt">
            Your score
          </p>
          <p className="mt-6 font-display text-7xl leading-none tracking-tight text-volt md:text-8xl">
            {score}
            <span className="text-bone/30">/{QUESTIONS.length}</span>
          </p>
          <p className="mx-auto mt-6 max-w-md font-display text-2xl leading-tight tracking-tight md:text-3xl">
            {verdict}
          </p>
          <button
            onClick={restart}
            className="mt-8 rounded-full bg-volt px-7 py-3 text-sm font-bold text-black transition hover:brightness-110"
          >
            Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-8 md:p-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-volt/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-volt">
            Football IQ · Question {i + 1} of {QUESTIONS.length}
          </p>
          <div className="hidden h-1 w-40 overflow-hidden rounded-full bg-ink-3 sm:block">
            <div
              className="h-full bg-volt transition-all duration-500"
              style={{ width: `${((i + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="mt-7 max-w-3xl font-display text-2xl leading-tight tracking-tight md:text-4xl">
          {q.q}
        </h3>

        <div className="mt-8 grid gap-3">
          {q.options.map((opt, idx) => {
            const isAnswer = idx === q.answer;
            const isPicked = picked === idx;
            const revealed = picked !== null;

            return (
              <button
                key={opt}
                onClick={() => choose(idx)}
                disabled={revealed}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left text-sm transition md:text-base ${
                  revealed && isAnswer
                    ? "border-volt bg-volt/10 text-bone"
                    : revealed && isPicked
                      ? "border-bone/25 bg-ink-3 text-mute line-through"
                      : revealed
                        ? "border-line text-mute"
                        : "border-line text-bone/90 hover:border-volt hover:bg-ink-3"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                    revealed && isAnswer
                      ? "border-volt bg-volt text-black"
                      : "border-line text-mute"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="animate-rise mt-7 border-t border-line pt-6">
            <p
              className={`text-xs uppercase tracking-[0.25em] ${
                correct ? "text-volt" : "text-bone/60"
              }`}
            >
              {correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
              {q.why}
            </p>
            <button
              onClick={next}
              className="mt-6 rounded-full bg-volt px-7 py-3 text-sm font-bold text-black transition hover:brightness-110"
            >
              {i === QUESTIONS.length - 1 ? "See your score" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
