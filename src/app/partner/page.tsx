import type { Metadata } from "next";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import Reveal from "@/components/Reveal";
import StatsBar from "@/components/StatsBar";
import { getStats, formatCompact } from "@/lib/stats";
import { Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Sponsorship and partnership opportunities with 45one, across the 451 podcast, Instagram, TikTok and YouTube.",
};

const packages = [
  {
    name: "Episode Sponsor",
    tag: "Most popular",
    image: img.ballCloseup,
    blurb:
      "Your brand fronts a full episode of 451, the audience's most engaged touchpoint with us.",
    includes: [
      "Pre-roll and mid-roll host read",
      "Logo on episode thumbnail and set",
      "Brand mention in title, description and pinned comment",
      "One dedicated clip cut for Instagram and TikTok",
    ],
  },
  {
    name: "Branded Segment",
    tag: "Recurring",
    image: img.pitchAerial,
    blurb:
      "Own a recurring feature, the transfer verdict, the weekend review, the debate of the week.",
    includes: [
      "Named segment across a run of episodes",
      "Custom on-screen graphics in your identity",
      "Segment clipped and posted natively to socials",
      "Usage rights for your own channels",
    ],
  },
  {
    name: "Social Campaign",
    tag: "Short-form",
    image: img.boots,
    blurb:
      "Built for the feed, Reels and TikToks made in our voice so they don't get scrolled past.",
    includes: [
      "3–5 pieces of short-form content",
      "Concepting, filming and edit included",
      "Coordinated posting schedule",
      "Performance report after the flight",
    ],
  },
];

const why = [
  {
    t: "An audience that shows up",
    d: "A weekly release schedule means a returning audience, not a spike-and-vanish one. People come for the analysis and they come back.",
  },
  {
    t: "Football-first, SA-first",
    d: "Our people follow the PSL, the Premier League, La Liga and Serie A in the same breath. A genuinely local audience with a global appetite.",
  },
  {
    t: "We make the ad watchable",
    d: "Every integration is scripted in our own voice. No stiff read-outs your audience skips.",
  },
];

export const revalidate = 1800;

export default async function PartnerPage() {
  const stats = await getStats();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.stadiumAerial}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/88 to-ink" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Eyebrow>For brands & agencies</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.88] tracking-tight">
            PUT YOUR BRAND
            <br />
            IN THE <span className="text-volt">CONVERSATION.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mute">
            45one works with brands that want to reach football fans properly 
            not with a banner they ignore, but inside content they choose to
            watch. Sponsorships across the 451 podcast, Instagram and TikTok.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex rounded-full bg-volt px-8 py-3.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            Request the media kit
          </Link>
        </div>
      </section>

      {/* ---------- LIVE AUDIENCE ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="The numbers"
          title="Live, not last quarter's."
          sub="These figures are pulled straight from our channels and refresh automatically, what you see here is what we have right now."
        />
        <StatsBar />

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-ink-2 p-7">
            <p className="font-display text-4xl tracking-tight text-volt">
              {stats.totalAudience !== null
                ? formatCompact(stats.totalAudience)
                : "n/a"}
            </p>
            <p className="mt-2 text-sm text-mute">
              Combined audience across {stats.reporting} of{" "}
              {stats.platforms.length} platforms
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-ink-2 p-7">
            <p className="font-display text-4xl tracking-tight text-volt">
              {stats.tiktokLikes !== null
                ? formatCompact(stats.tiktokLikes)
                : stats.youtubeViews !== null
                  ? formatCompact(stats.youtubeViews)
                  : "n/a"}
            </p>
            <p className="mt-2 text-sm text-mute">
              {stats.tiktokLikes !== null
                ? "Lifetime likes on TikTok"
                : "Lifetime YouTube views"}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-ink-2 p-7">
            <p className="font-display text-4xl tracking-tight text-volt">52</p>
            <p className="mt-2 text-sm text-mute">
              Episodes a year, a weekly slot, not a one-off
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-line px-5 py-20 md:px-8 md:py-28">
        <SectionHeading eyebrow="Why 45one" title="Attention, not impressions." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="bg-ink p-8 md:p-10">
              <h3 className="font-display text-2xl leading-tight tracking-tight">
                {w.t}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mute">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Pick a lane, or we'll build one."
            sub="Every package is a starting point. Tell us the objective and we'll shape something around it."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className="h-full">
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink transition hover:border-volt/50"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-8">
                <span className="w-fit rounded-full border border-volt/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-volt">
                  {p.tag}
                </span>
                <h3 className="mt-6 font-display text-3xl tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{p.blurb}</p>
                <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-6">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-3 text-sm text-bone/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                      {i}
                    </li>
                  ))}
                </ul>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-mute">
            Rates depend on flight length and exclusivity. Send us a brief and
            we&apos;ll come back with pricing and current channel numbers.
          </p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden border-t border-line">
        <Image
          src={img.floodlights}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 to-ink" />

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
          <Eyebrow>
            <span className="mx-auto">Next step</span>
          </Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-tight">
            LET&apos;S TALK
            <br />
            <span className="text-volt">NUMBERS.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute">
            Send us the brief and we will come back with the media kit, current
            audience figures, past work and rates. Usually within two working
            days.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-volt px-8 py-4 text-sm font-bold text-black transition hover:brightness-110"
            >
              Go to the contact page
            </Link>
            <a
              href={`mailto:${site.contact.partnerships}`}
              className="rounded-full border border-line px-8 py-4 text-sm font-bold transition hover:border-volt hover:text-volt"
            >
              Email us directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
