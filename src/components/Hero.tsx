import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import { episodeNumber, type Video } from "@/lib/youtube";
import HeroBadge from "./HeroBadge";
import Countdown from "./Countdown";
import { SocialRow } from "./SocialIcons";

export default function Hero({ latest }: { latest?: Video }) {
  const ep = latest ? episodeNumber(latest.title) : null;

  return (
    <section className="relative isolate overflow-hidden">
      {/* ---------- backdrop ---------- */}
      <Image
        src={img.floodlights}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-[0.42]"
      />
      {/* darken bottom + edges so type stays readable */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.55)_35%,rgba(5,5,5,0.94)_88%,#050505_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_78%_38%,rgba(242,255,0,0.20),transparent_70%)]" />
      <div className="pitch-grid absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          {/* ---------- copy ---------- */}
          <div>
            <div className="animate-rise inline-flex items-center gap-3 rounded-full border border-volt/30 bg-volt/[0.07] px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-volt">
                New episode every {site.release.day} · {site.release.time}
              </span>
            </div>

            <h1 className="mt-7 font-display text-[clamp(3.6rem,10.5vw,9.5rem)] leading-[0.8] tracking-[-0.02em]">
              <span className="animate-rise block" style={{ animationDelay: "70ms" }}>
                FOOTBALL,
              </span>
              <span
                className="animate-rise block text-volt drop-shadow-[0_0_36px_rgba(242,255,0,0.35)]"
                style={{ animationDelay: "160ms" }}
              >
                IN DEPTH.
              </span>
            </h1>

            <p
              className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-bone/75"
              style={{ animationDelay: "250ms" }}
            >
              45one is the home of the{" "}
              <strong className="text-bone">451 podcast</strong>. Long-form
              analysis of the PSL, the Premier League, La Liga, Serie A and the
              rest of Europe&apos;s top leagues. The why behind the result.
            </p>

            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "340ms" }}
            >
              <Link
                href="/podcast"
                className="group inline-flex items-center gap-3 rounded-full bg-volt py-3.5 pl-4 pr-7 text-sm font-bold text-black transition hover:brightness-110"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-volt transition group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
                Watch the podcast
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-line bg-ink/40 px-7 py-3.5 text-sm font-bold backdrop-blur-sm transition hover:border-volt hover:text-volt"
              >
                Get in touch
              </Link>
            </div>

            <div className="animate-rise mt-11" style={{ animationDelay: "430ms" }}>
              <SocialRow />
            </div>
          </div>

          {/* ---------- badge + drop panel ---------- */}
          <div className="relative">
            <HeroBadge />

            <div className="animate-rise mt-2 rounded-3xl border border-line/80 bg-ink/55 p-5 backdrop-blur-xl md:p-6" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                  Next episode drops in
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-volt">
                  {site.release.day} {site.release.time}
                </p>
              </div>
              <div className="mt-4">
                <Countdown />
              </div>

              {latest && (
                <Link
                  href="/podcast"
                  className="group mt-5 flex items-center gap-4 border-t border-line pt-5"
                >
                  <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-line">
                    <Image
                      src={latest.thumbnail}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-volt text-black">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
                          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-volt">
                      {ep ? `Latest · Episode ${ep}` : "Latest episode"}
                    </span>
                    <span className="mt-1 block truncate text-sm font-medium text-bone/90 transition group-hover:text-volt">
                      {latest.title}
                    </span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ---------- scroll cue ---------- */}
        <div className="mt-14 flex justify-center lg:mt-8">
          <div className="scroll-cue flex flex-col items-center gap-2 text-mute">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
