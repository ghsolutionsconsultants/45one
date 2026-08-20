"use client";

import { useEffect, useRef, useState } from "react";
import { quizzes, type Quiz } from "@/lib/quizzes";
import { saveLocal } from "./Leaderboard";

export default function FootballIQ({
  onSubmitted,
  showEntry = false,
}: {
  /** Called after a score is added to the board, so the table can refresh. */
  onSubmitted?: () => void;
  /** Offer to put the score on the leaderboard when the round finishes. */
  showEntry?: boolean;
}) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const startedAt = useRef<number>(0);
  const [attempt, setAttempt] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [name, setName] = useState("");
  const [entryState, setEntryState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  function start(q: Quiz) {
    setQuiz(q);
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setEntryState("idle");
    setName("");
    setAttempt((n) => n + 1);
  }

  // Clock starts when a round is loaded, not while rendering.
  useEffect(() => {
    if (!quiz) return;
    startedAt.current = Date.now();
  }, [quiz, attempt]);

  function reset() {
    setQuiz(null);
    setDone(false);
  }

  /* ---------------- category picker ---------------- */
  if (!quiz) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:rounded-3xl sm:p-8 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-volt/10 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.2em] text-volt sm:text-xs sm:tracking-[0.3em]">
            Pick your round
          </p>
          <h3 className="mt-4 font-display text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl">
            Five rounds. Eight questions each. Every answer explained.
          </h3>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q) => (
              <button
                key={q.id}
                onClick={() => start(q)}
                className="group rounded-2xl border border-line bg-ink p-5 text-left transition hover:border-volt hover:bg-ink-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-xl tracking-tight transition group-hover:text-volt">
                    {q.name}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-mute">
                    {q.questions.length} Qs
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-mute">{q.tagline}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[i];
  const correct = picked === question.answer;

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === question.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i === quiz!.questions.length - 1) {
      setSeconds(Math.round((Date.now() - startedAt.current) / 1000));
      setDone(true);
      return;
    }
    setI((v) => v + 1);
    setPicked(null);
  }

  async function submitScore(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!quiz || !name.trim()) return;
    setEntryState("saving");

    const entry = {
      name: name.trim().slice(0, 24),
      quiz: quiz.name,
      score,
      total: quiz.questions.length,
      seconds,
      at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      const json = (await res.json()) as { configured?: boolean };
      // No shared store yet, so keep it on this device instead of losing it.
      if (json.configured === false) saveLocal(entry);
      setEntryState("saved");
      onSubmitted?.();
    } catch {
      saveLocal(entry);
      setEntryState("error");
      onSubmitted?.();
    }
  }

  /* ---------------- result ---------------- */
  if (done) {
    const total = quiz.questions.length;
    const verdict =
      score === total
        ? "Full marks. You could take the badges."
        : score >= total * 0.75
          ? "Strong. You watch the game properly."
          : score >= total * 0.5
            ? "Decent. The gaps are the interesting part."
            : "Plenty to build on. That is what the podcast is for.";

    return (
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 text-center sm:rounded-3xl sm:p-8 md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/10 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.25em] text-volt">
            {quiz.name}
          </p>
          <p className="mt-5 font-display text-6xl leading-none tracking-tight text-volt sm:text-7xl md:text-8xl">
            {score}
            <span className="text-bone/30">/{total}</span>
          </p>
          <p className="mx-auto mt-5 max-w-md font-display text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl">
            {verdict}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-mute">
            Finished in {Math.floor(seconds / 60)}m{" "}
            {String(seconds % 60).padStart(2, "0")}s
          </p>

          {showEntry && (
            <div className="mx-auto mt-8 max-w-md">
              {entryState === "saved" ? (
                <p className="rounded-xl border border-volt/40 bg-volt/5 px-4 py-3 text-sm text-volt">
                  You are on the board. Scroll down to find yourself.
                </p>
              ) : (
                <form onSubmit={submitScore} className="flex flex-col gap-2.5 sm:flex-row">
                  <input
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    required
                    maxLength={24}
                    placeholder="Your name or handle"
                    aria-label="Your name for the leaderboard"
                    className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-base text-bone outline-none transition placeholder:text-mute focus:border-volt sm:text-sm"
                  />
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />
                  <button
                    type="submit"
                    disabled={entryState === "saving"}
                    className="shrink-0 rounded-xl bg-volt px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-60"
                  >
                    {entryState === "saving" ? "Saving…" : "Add to board"}
                  </button>
                </form>
              )}
              {entryState === "error" && (
                <p className="mt-2 text-xs text-mute">
                  Saved on this device. We could not reach the shared board.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => start(quiz)}
              className="rounded-full bg-volt px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
            >
              Play again
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-volt hover:text-volt"
            >
              Try another round
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- question ---------------- */
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:rounded-3xl sm:p-8 md:p-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-volt/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-volt sm:text-xs sm:tracking-[0.3em]">
            {quiz.name} · {i + 1} of {quiz.questions.length}
          </p>
          <button
            onClick={reset}
            className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-mute hover:text-volt"
          >
            Change round
          </button>
        </div>

        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink-3">
          <div
            className="h-full bg-volt transition-all duration-500"
            style={{
              width: `${((i + (picked !== null ? 1 : 0)) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>

        <h3 className="mt-6 max-w-3xl font-display text-xl leading-tight tracking-tight sm:text-2xl md:text-4xl">
          {question.q}
        </h3>

        <div className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3">
          {question.options.map((opt, idx) => {
            const isAnswer = idx === question.answer;
            const isPicked = picked === idx;
            const revealed = picked !== null;

            return (
              <button
                key={opt}
                onClick={() => choose(idx)}
                disabled={revealed}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 md:text-base ${
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
              className={`text-[10px] uppercase tracking-[0.25em] ${
                correct ? "text-volt" : "text-bone/60"
              }`}
            >
              {correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
              {question.why}
            </p>
            <button
              onClick={next}
              className="mt-6 rounded-full bg-volt px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
            >
              {i === quiz.questions.length - 1 ? "See your score" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
