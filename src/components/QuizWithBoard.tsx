"use client";

import { useState } from "react";
import FootballIQ from "./FootballIQ";
import Leaderboard from "./Leaderboard";

/** Quiz and leaderboard together, so a submitted score refreshes the table. */
export default function QuizWithBoard() {
  const [version, setVersion] = useState(0);

  return (
    <>
      <FootballIQ showEntry onSubmitted={() => setVersion((v) => v + 1)} />

      <div id="leaderboard" className="mt-12 scroll-mt-24 md:mt-16">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-volt">
              <span className="h-px w-8 bg-volt" />
              The board
            </p>
            <h2 className="mt-4 font-display text-3xl leading-none tracking-tight sm:text-4xl">
              Who actually knows their football.
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-mute">
            Score first, then fastest time
          </p>
        </div>
        <Leaderboard refreshKey={version} />
      </div>
    </>
  );
}
