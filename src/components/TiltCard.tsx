"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Image card that tips towards the cursor. Falls back to a plain card on touch. */
export default function TiltCard({
  src,
  alt,
  label,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: py * -9, y: px * 9 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className={`group relative overflow-hidden rounded-2xl border border-line ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        transition: "transform 350ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      {label && (
        <p className="absolute bottom-4 left-5 font-display text-lg tracking-tight text-bone">
          {label}
        </p>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-volt/0 transition duration-500 group-hover:ring-volt/60" />
    </div>
  );
}
