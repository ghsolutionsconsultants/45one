"use client";

import { useEffect, useRef, useState } from "react";
import { formatCompact } from "@/lib/stats";

/**
 * Renders the real figure server-side, then animates up to it as a progressive
 * enhancement. Starting at zero would mean crawlers, slow connections and
 * anyone with JS disabled reading "0 Subscribers", which is worse than having
 * no animation at all.
 */
export default function CountUp({
  value,
  compact = true,
  className = "",
}: {
  value: number;
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  const [animateFrom, setAnimateFrom] = useState<number | null>(null);

  // Decide whether to animate at all. Only counters that start below the fold
  // get rewound to zero, so nothing visible ever flickers backwards.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight) return; // already on screen, leave it
      setAnimateFrom(0);
      setN(0);
    });
    return () => cancelAnimationFrame(raf);
  }, [value]);

  // Run the count once it scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (el === null || animateFrom === null) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animateFrom, value]);

  return (
    <span ref={ref} className={className}>
      {compact ? formatCompact(n) : n.toLocaleString("en-ZA")}
    </span>
  );
}
