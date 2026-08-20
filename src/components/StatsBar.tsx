import { getStats, formatCompact } from "@/lib/stats";
import { site } from "@/lib/site";
import CountUp from "./CountUp";

const handles: Record<string, string> = {
  YouTube: site.youtube.handle,
  Instagram: "@45one_za",
  TikTok: "@45one_za_",
};

/** Compact three-platform strip. Used on the homepage. */
export default async function StatsBar({ dark = false }: { dark?: boolean }) {
  const stats = await getStats();

  return (
    <div
      className={`grid gap-px overflow-hidden rounded-2xl border ${
        dark ? "border-black/20 bg-black/20" : "border-line bg-line"
      } sm:grid-cols-3`}
    >
      {stats.platforms.map((p) => (
        <a
          key={p.platform}
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className={`group p-5 transition sm:p-7 md:p-8 ${
            dark ? "bg-volt hover:bg-volt/90" : "bg-ink hover:bg-ink-3"
          }`}
        >
          <div className="flex items-center justify-between">
            <p
              className={`text-xs uppercase tracking-[0.25em] ${
                dark ? "text-black/60" : "text-mute"
              }`}
            >
              {p.platform}
            </p>
            {p.live && (
              <span
                className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] ${
                  dark ? "text-black/60" : "text-volt"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 animate-pulse rounded-full ${
                    dark ? "bg-black" : "bg-volt"
                  }`}
                />
                Live
              </span>
            )}
          </div>

          {p.primary.value !== null ? (
            <>
              <p
                className={`mt-3 font-display text-4xl tracking-tight sm:text-5xl md:text-6xl ${
                  dark ? "text-black" : "text-volt"
                }`}
              >
                <CountUp value={p.primary.value} />
              </p>
              <p className={`mt-1 text-sm ${dark ? "text-black/60" : "text-mute"}`}>
                {p.primary.label}
              </p>
            </>
          ) : (
            <>
              <p
                className={`mt-3 font-display text-2xl tracking-tight sm:text-3xl md:text-4xl ${
                  dark ? "text-black" : "text-bone"
                }`}
              >
                {handles[p.platform]}
              </p>
              <p
                className={`mt-1 text-sm underline-offset-4 group-hover:underline ${
                  dark ? "text-black/60" : "text-volt"
                }`}
              >
                View profile →
              </p>
            </>
          )}

          {p.secondary.value !== null && (
            <p
              className={`mt-4 border-t pt-4 text-sm ${
                dark ? "border-black/20 text-black/70" : "border-line text-bone/70"
              }`}
            >
              <strong className={dark ? "text-black" : "text-bone"}>
                {formatCompact(p.secondary.value)}
              </strong>{" "}
              {p.secondary.label.toLowerCase()}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}
