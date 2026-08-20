import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { img, galleryImages } from "@/lib/images";
import { getVideos, formatDate } from "@/lib/youtube";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import Hero from "@/components/Hero";
import VideoGrid from "@/components/VideoGrid";
import StatsBar from "@/components/StatsBar";
import TacticsBoard from "@/components/TacticsBoard";
import Countdown from "@/components/Countdown";
import FootballIQ from "@/components/FootballIQ";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";
import { SocialRow } from "@/components/SocialIcons";
import { Button, Eyebrow, Marquee, SectionHeading } from "@/components/ui";

export const revalidate = 1800;

export default async function Home() {
  const videos = await getVideos();
  const latest = videos[0];
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero latest={latest} />

      <Marquee
        items={[
          "451 PODCAST",
          "EVERY THURSDAY",
          "PSL",
          "PREMIER LEAGUE",
          "LA LIGA",
          "SERIE A",
          "TRANSFERS",
          "TACTICS",
          "FOOTBALL CONTENT",
        ]}
      />

      {/* ================= LIVE AUDIENCE ================= */}
      <section className="mx-auto max-w-7xl px-5 pt-12 md:px-8 md:pt-28">
        <Reveal>
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>The audience</Eyebrow>
              <h2 className="mt-4 font-display text-4xl leading-none tracking-tight md:text-6xl">
                Growing every Thursday.
              </h2>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-mute">
              Pulled live from our channels
            </p>
          </div>
          <StatsBar />
        </Reveal>
      </section>

      {/* ================= LATEST EPISODE ================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Latest episode"
            title="This week on 451"
            sub="Full episodes land every Thursday at 08:00. Watch right here without leaving the site."
            action={{ href: "/podcast", label: "All episodes" }}
          />
        </Reveal>
        <Reveal delay={80}>
          <VideoGrid videos={videos.slice(0, 4)} featureFirst />
        </Reveal>
        {latest && (
          <p className="mt-10 text-sm text-mute">
            Released {formatDate(latest.published)}
          </p>
        )}
      </section>

      {/* ================= TACTICS BOARD ================= */}
      <section className="relative overflow-hidden border-y border-line bg-ink-2">
        <Image
          src={img.pitchAerial}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Interactive"
              title="The tactics board."
              sub="Switch the shape, tap any player, and see the job they are actually being asked to do. The same breakdowns we do on the podcast, laid out on grass."
            />
          </Reveal>
          <Reveal delay={80}>
            <TacticsBoard />
          </Reveal>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="One brand. Every format."
            sub="Long-form analysis on YouTube, short explainers built for the feed on Instagram and TikTok, and writing you can sit with."
          />
        </Reveal>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "The Podcast",
              d: "A weekly, full-length breakdown of the game. Structured conversation, real preparation, guests worth listening to.",
              href: "/podcast",
              src: img.ballCloseup,
              alt: "Close up of a match ball",
            },
            {
              n: "02",
              t: "Short-form",
              d: "Short explainers and match-day analysis built for Reels and TikTok, where our audience already lives.",
              href: site.socials.instagram,
              src: img.boots,
              alt: "Yellow and black football boots on grass",
            },
            {
              n: "03",
              t: "Writing",
              d: "Tactical breakdowns, transfer analysis and long reads on the state of South African football.",
              href: "/blog",
              src: img.cones,
              alt: "Training cones and an agility ladder on a pitch",
            },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 90}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line sm:aspect-[4/3]">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <p className="absolute left-5 top-4 font-display text-3xl text-volt/70 sm:left-6 sm:top-5 sm:text-4xl">
                    {c.n}
                  </p>
                  <h3 className="absolute bottom-4 left-5 font-display text-xl tracking-tight sm:bottom-5 sm:left-6 sm:text-2xl">
                    {c.t}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-mute">{c.d}</p>
                <span className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-volt opacity-0 transition group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FOOTBALL IQ ================= */}
      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8 md:pb-28">
        <Reveal>
          <SectionHeading
            eyebrow="Test yourself"
            title="Football IQ."
            sub="Five questions on the things that actually decide matches. Every answer comes with the reasoning behind it."
          />
          <FootballIQ />
        </Reveal>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="The game" title="Grass, leather, floodlights." />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {galleryImages.map((g, i) => (
              <Reveal key={g.src} delay={i * 60}>
                <TiltCard
                  src={g.src}
                  alt={g.alt}
                  label={g.label}
                  className="aspect-square sm:aspect-[4/3]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEAGUES ================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="What we cover"
            title="Every league that matters."
            sub="South African football first, then the rest of the game with the same depth."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              { l: "PSL", d: "Chiefs, Pirates, Sundowns and the rest, covered as the main event." },
              { l: "Premier League", d: "The money, the mistakes and the managers on the clock." },
              { l: "La Liga", d: "Spain's giants and the sides quietly doing it better." },
              { l: "Serie A", d: "Where tactics still decide games before the whistle." },
              { l: "Bundesliga & Ligue 1", d: "The talent factories the rest of Europe shops at." },
              { l: "Europe & beyond", d: "Champions League nights, internationals and the big transfers." },
            ].map((c) => (
              <div key={c.l} className="group bg-ink p-6 transition hover:bg-ink-3 sm:p-8">
                <h3 className="font-display text-xl tracking-tight transition group-hover:text-volt sm:text-2xl">
                  {c.l}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= BLOG ================= */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="From the blog"
              title="Words, not just noise"
              action={{ href: "/blog", label: "Read all" }}
            />
          </Reveal>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <p className="text-xs uppercase tracking-[0.2em] text-volt">
                    {p.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl leading-tight tracking-tight transition group-hover:text-volt md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute">
                    {p.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-mute">
                    {formatPostDate(p.date)} · {p.readingTime} min read
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ================= SPONSOR CTA ================= */}
      <section className="relative overflow-hidden border-t border-line bg-volt text-black">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">
                For brands
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-6xl">
                REACH FOOTBALL FANS
                <br />
                WHO ACTUALLY WATCH.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/70 sm:text-base">
                Episode sponsorships, integrated reads, branded segments and
                social campaigns across YouTube, Instagram and TikTok. Tell us
                what you need and we will send the media kit.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-bold text-volt transition hover:bg-ink-3"
              >
                Start a conversation
              </Link>
              <Link
                href="/partner"
                className="text-sm font-medium text-black/70 underline underline-offset-4 hover:text-black"
              >
                See what we offer
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t border-black/20 pt-8 sm:mt-16 sm:pt-10">
            <StatsBar dark />
          </div>
        </div>
      </section>
    </>
  );
}
