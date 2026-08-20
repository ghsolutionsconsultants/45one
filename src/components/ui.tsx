import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-volt">
      <span className="h-px w-8 bg-volt" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
          {title}
        </h2>
        {sub && <p className="mt-4 text-base leading-relaxed text-mute">{sub}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 rounded-full border border-line px-6 py-3 text-sm font-medium transition hover:border-volt hover:text-volt"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition";
  const styles =
    variant === "solid"
      ? "bg-volt text-black hover:brightness-110"
      : "border border-line text-bone hover:border-volt hover:text-volt";
  const cls = `${base} ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-line bg-ink-2 py-4">
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-xl tracking-tight text-bone/70 md:text-2xl">
              {item}
            </span>
            <span className="text-volt">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="font-display text-4xl tracking-tight text-volt md:text-5xl">{value}</p>
      <p className="mt-2 text-sm text-mute">{label}</p>
    </div>
  );
}
