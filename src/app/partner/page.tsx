import type { Metadata } from "next";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import Reveal from "@/components/Reveal";
import StatsBar from "@/components/StatsBar";
import InquiryForm from "@/components/InquiryForm";
import { getStats, formatCompact } from "@/lib/stats";
import { managerCount } from "@/lib/fpl";
import { Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Sponsorship and partnership opportunities with 45one. Episode sponsorships, branded segments and social campaigns across the 451 podcast, Instagram, TikTok and YouTube.",
};

const quickFacts = [
  "Weekly, every Thursday 08:00",
  "YouTube, Instagram, TikTok",
  "PSL and Europe's top leagues",
  "Made in South Africa",
];

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
      "3 to 5 pieces of short-form content",
      "Concepting, filming and edit included",
      "Coordinated posting schedule",
      "Performance report after the flight",
    ],
  },
  {
    name: "Season Partner",
    tag: "Always on",
    image: img.stadiumNight,
    blurb:
      "The whole season, one brand. Presence in every episode and across everything we build around it.",
    includes: [
      "Presenting credit on every episode of the run",
      "Category exclusivity for the season",
      "Presence on the fantasy league and quiz pages",
      "Quarterly reporting and a say in the content calendar",
    ],
  },
  {
    name: "Fantasy League Partner",
    tag: "Community",
    image: img.ballTurf,
    blurb: `Back the 45one Premier League, ${managerCount} managers playing each other every gameweek from August to May.`,
    includes: [
      "Branding on the live league table and awards",
      "Named award category running all season",
      "Prize fulfilment and winner announcements",
      "A weekly reason for the audience to come back",
    ],
  },
  {
    name: "Event & Activation",
    tag: "On the ground",
    image: img.cones,
    blurb:
      "Watch parties, launches, fan days and tournaments, covered properly and cut for the feed.",
    includes: [
      "On-site filming and same-week edit",
      "Live posting across our channels",
      "Full asset library handed over to you",
      "Hosting and presenting on request",
    ],
  },
];

const matrixHeads = ["Episode", "Segment", "Social", "Season"];

type Cell = boolean | string;

const matrix: { label: string; cells: Cell[] }[] = [
  { label: "Host-read integration", cells: [true, true, false, true] },
  { label: "Logo on thumbnail and set", cells: [true, true, false, true] },
  { label: "Named recurring feature", cells: [false, true, false, true] },
  { label: "Custom graphics in your identity", cells: [false, true, true, true] },
  { label: "Short-form cut-downs", cells: ["1", "Per episode", "3 to 5", "Weekly"] },
  { label: "Posted natively to IG and TikTok", cells: [true, true, true, true] },
  { label: "Link and pinned comment", cells: [true, true, true, true] },
  { label: "Usage rights for your own channels", cells: [false, true, true, true] },
  { label: "Performance report", cells: [false, false, true, "Quarterly"] },
  { label: "Category exclusivity", cells: [false, "Optional", false, true] },
  { label: "Fantasy league and quiz presence", cells: [false, false, false, true] },
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
    t: "They do more than watch",
    d: `${managerCount} managers in our fantasy league, a tactics board people play with and a weekly quiz with a leaderboard. That is participation, not passive reach.`,
  },
  {
    t: "We make the ad watchable",
    d: "Every integration is scripted in our own voice. No stiff read-outs your audience skips.",
  },
];

const steps = [
  {
    n: "01",
    t: "Send the brief",
    when: "Day one",
    d: "What you are launching, who it is for, when it needs to be live and a rough budget band. The form at the bottom of this page covers it.",
  },
  {
    n: "02",
    t: "We come back with a plan",
    when: "Within two working days",
    d: "The media kit, current channel numbers, the formats we would recommend for your objective and what each one costs.",
  },
  {
    n: "03",
    t: "Script and sign-off",
    when: "Before we record",
    d: "You see the read, the graphics and the posting plan before a camera turns on. Nothing goes out that you have not approved.",
  },
  {
    n: "04",
    t: "We make it",
    when: "In the weekly rhythm",
    d: "Filmed, edited and published in our normal Thursday slot, with the short-form cut-downs scheduled around it.",
  },
  {
    n: "05",
    t: "You get the numbers",
    when: "After the flight",
    d: "Views, watch-through, saves, shares, comments and link clicks, pulled straight from the platforms, with what we would change next time.",
  },
];

const safety = [
  {
    t: "Analysis, not outrage",
    d: "We built this brand on explaining the game, not manufacturing a row about it. Your brand will not end up attached to a pile-on.",
  },
  {
    t: "Nothing goes out unapproved",
    d: "Scripts, graphics and captions come to you before publication, every time.",
  },
  {
    t: "Clean on every platform",
    d: "Language and edits stay advertiser-safe across YouTube, Instagram and TikTok, so there is nothing to hold back from your own channels.",
  },
  {
    t: "We say no to the wrong fit",
    d: "If we cannot talk about your product honestly on camera, we will tell you instead of taking the money.",
  },
];

const faqs = [
  {
    q: "What does it cost?",
    a: "It depends on the format, the length of the flight and whether you want category exclusivity. Send a budget band with your brief and we will tell you straight away what is realistic.",
  },
  {
    q: "How much lead time do you need?",
    a: "Two to three weeks is comfortable for an episode or a segment. We have turned campaigns around faster, so ask if your date is tight.",
  },
  {
    q: "Can we use the content on our own channels?",
    a: "Yes, on every package except a single episode read, where usage rights are an add-on. We hand over the raw files and the finished cuts.",
  },
  {
    q: "Do you offer category exclusivity?",
    a: "It is built into a season partnership and available as an add-on elsewhere. Tell us the category and the window you need locked.",
  },
  {
    q: "What reporting do we get?",
    a: "Platform numbers for every piece in the flight, with watch-through and saves, not just views. Season partners get it quarterly.",
  },
  {
    q: "Can you make something that is not on this page?",
    a: "Usually. The packages are a starting point. Tell us the objective and we will shape the format around it.",
  },
];

const partnerInterests = [
  "Episode sponsorship",
  "Branded segment",
  "Social campaign (IG / TikTok)",
  "Season partnership",
  "Fantasy league partnership",
  "Event or activation",
  "Something else",
];

export const revalidate = 1800;

function MatrixCell({ value }: { value: Cell }) {
  if (value === true)
    return <span className="text-base text-volt">&#10003;</span>;
  if (value === false) return <span className="text-mute/50">&ndash;</span>;
  return <span className="text-bone/85">{value}</span>;
}

export default async function PartnerPage() {
  const stats = await getStats();

  return (
    <>
      {/* ---------- HERO ---------- */}
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
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Eyebrow>For brands &amp; agencies</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,9vw,6.5rem)] leading-[0.88] tracking-tight">
            PUT YOUR BRAND
            <br />
            IN THE <span className="text-volt">CONVERSATION.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:mt-7 sm:text-lg">
            45one works with brands that want to reach football fans properly,
            not with a banner they ignore, but inside content they choose to
            watch. Sponsorships across the 451 podcast, Instagram and TikTok.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#enquiry"
              className="inline-flex items-center justify-center rounded-full bg-volt px-8 py-3.5 text-sm font-bold text-black transition hover:brightness-110"
            >
              Request the media kit
            </Link>
            <Link
              href="#packages"
              className="inline-flex items-center justify-center rounded-full border border-line px-8 py-3.5 text-sm font-bold transition hover:border-volt hover:text-volt"
            >
              See what we offer
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 text-xs uppercase tracking-[0.18em] text-mute">
            {quickFacts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- LIVE AUDIENCE ---------- */}
      <section
        id="audience"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 md:px-8 md:py-24"
      >
        <SectionHeading
          eyebrow="The numbers"
          title="Live, not last quarter's."
          sub="These figures are pulled straight from our channels and refresh automatically, what you see here is what we have right now."
        />
        <StatsBar />

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-7">
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
          <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-7">
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
          <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-7">
            <p className="font-display text-4xl tracking-tight text-volt">52</p>
            <p className="mt-2 text-sm text-mute">
              Episodes a year, a weekly slot, not a one-off
            </p>
          </div>
        </div>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="mx-auto max-w-7xl border-t border-line px-5 py-12 md:px-8 md:py-28">
        <SectionHeading eyebrow="Why 45one" title="Attention, not impressions." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w) => (
            <div key={w.t} className="bg-ink p-6 sm:p-8 md:p-10">
              <h3 className="font-display text-2xl leading-tight tracking-tight">
                {w.t}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mute">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PACKAGES ---------- */}
      <section id="packages" className="scroll-mt-24 border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Pick a lane, or we'll build one."
            sub="Every package is a starting point. Tell us the objective and we'll shape something around it."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 90} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink transition hover:border-volt/50">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <span className="w-fit rounded-full border border-volt/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-volt">
                      {p.tag}
                    </span>
                    <h3 className="mt-6 font-display text-3xl tracking-tight">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mute">
                      {p.blurb}
                    </p>
                    <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-6">
                      {p.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-bone/85">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                          {item}
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

      {/* ---------- COMPARISON ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Side by side"
          title="What's in each one."
          sub="The four headline packages compared. Anything here can be added to anything else."
        />
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-4 pr-4 text-xs font-medium uppercase tracking-[0.2em] text-mute">
                  Included
                </th>
                {matrixHeads.map((h) => (
                  <th
                    key={h}
                    className="px-3 py-4 text-center font-display text-lg tracking-tight"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.label} className="border-b border-line/60">
                  <td className="py-4 pr-4 text-sm text-bone/85">{row.label}</td>
                  {row.cells.map((c, i) => (
                    <td key={i} className="px-3 py-4 text-center text-sm">
                      <MatrixCell value={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-mute md:hidden">
          Swipe the table to see every column.
        </p>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <SectionHeading
            eyebrow="How it works"
            title="Brief to broadcast."
            sub="Five steps, no agency runaround. You deal with the people who make the content."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col bg-ink p-6 sm:p-7">
                  <p className="font-display text-4xl tracking-tight text-volt">
                    {s.n}
                  </p>
                  <h3 className="mt-5 font-display text-xl leading-tight tracking-tight">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-mute">
                    {s.when}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-mute">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BRAND SAFETY ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.stadiumEmpty}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <SectionHeading
            eyebrow="Brand safety"
            title="What you're sitting next to."
            sub="We are an education-first football brand. That is the whole proposition, and it is what makes us safe to sponsor."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {safety.map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8"
              >
                <h3 className="font-display text-2xl leading-tight tracking-tight">
                  {s.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ENQUIRY ---------- */}
      <section
        id="enquiry"
        className="relative scroll-mt-24 overflow-hidden border-b border-line bg-ink-2"
      >
        <span id="contact" className="absolute -top-24 block h-px w-px" aria-hidden />
        <Image
          src={img.pitchAerial}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Start here</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
                Send us the brief.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-mute">
                The more you tell us up front, the more useful our first reply
                will be. Budget band and timing help most. You will get the
                media kit, current numbers and rates back within two working
                days.
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-6 inline-block text-sm text-volt hover:underline"
              >
                {site.contact.email}
              </a>

              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl border border-line lg:block">
                <Image
                  src={img.floodlights}
                  alt="An empty pitch under floodlights at night"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              </div>
            </div>

            <InquiryForm interests={partnerInterests} source="Partner page" />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Eyebrow>Before you ask</Eyebrow>
        <h2 className="mt-5 font-display text-4xl leading-none tracking-tight md:text-5xl">
          The usual questions.
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="bg-ink p-6 sm:p-8">
              <h3 className="font-display text-xl tracking-tight">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{f.a}</p>
            </div>
          ))}
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

        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-32">
          <Eyebrow>
            <span className="mx-auto">Next step</span>
          </Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,8vw,5rem)] leading-[0.9] tracking-tight">
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
              href="#enquiry"
              className="rounded-full bg-volt px-8 py-4 text-sm font-bold text-black transition hover:brightness-110"
            >
              Send a brief
            </Link>
            <a
              href={`mailto:${site.contact.email}`}
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
