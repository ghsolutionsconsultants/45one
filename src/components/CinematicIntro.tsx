"use client";

import { useEffect, useState } from "react";

/**
 * Plays once per browser session: a black curtain, the badge igniting, then
 * a wipe up to reveal the site. Skipped entirely for anyone who has asked
 * for reduced motion.
 */
export default function CinematicIntro() {
  // Starts covered so there is never a flash of the page before the curtain.
  const [phase, setPhase] = useState<"playing" | "lifting" | "done">("playing");

  useEffect(() => {
    let lift: ReturnType<typeof setTimeout>;
    let end: ReturnType<typeof setTimeout>;

    const raf = requestAnimationFrame(() => {
      const seen = sessionStorage.getItem("45one-intro");
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (seen || reduced) {
        setPhase("done");
        return;
      }

      sessionStorage.setItem("45one-intro", "1");
      document.body.style.overflow = "hidden";
      lift = setTimeout(() => setPhase("lifting"), 1750);
      end = setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 2650);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(lift);
      clearTimeout(end);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "lifting" ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden
    >
      {/* sweeping floodlight */}
      <div className="intro-sweep absolute inset-0" />

      <div className="relative flex flex-col items-center">
        <div className="intro-badge relative">
          <div className="absolute -inset-10 rounded-full bg-volt/20 blur-3xl" />
          <div
            className="relative h-32 w-32 bg-contain bg-center bg-no-repeat md:h-44 md:w-44"
            style={{ backgroundImage: "url('/brand/logo-glow.webp')" }}
          />
        </div>

        <div className="mt-8 overflow-hidden">
          <p className="intro-word font-display text-3xl tracking-tight md:text-5xl">
            FOOTBALL, <span className="text-volt">IN DEPTH</span>
          </p>
        </div>

        <div className="mt-7 h-px w-56 overflow-hidden bg-line">
          <div className="intro-bar h-full bg-volt" />
        </div>
      </div>
    </div>
  );
}
