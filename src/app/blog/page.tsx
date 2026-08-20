import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import Reveal from "@/components/Reveal";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { Button, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Football writing from 45one: tactical breakdowns, transfer analysis and long reads on the South African game.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.ballCloseup}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <Eyebrow>Writing</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.9] tracking-tight">
            THE <span className="text-volt">BLOG</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
            The analysis that needs more room than a podcast segment. Tactics,
            transfers and the business of the game.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        {posts.length === 0 && (
          <div className="relative overflow-hidden rounded-3xl border border-line">
            <Image
              src={img.floodlights}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-ink/80" />
            <div className="relative px-6 py-20 text-center md:px-16 md:py-28">
              <p className="text-xs uppercase tracking-[0.3em] text-volt">
                Coming soon
              </p>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
                THE FIRST PIECE IS
                <br />
                <span className="text-volt">BEING WRITTEN.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute">
                Tactical breakdowns, transfer deep dives and long reads on the
                PSL, the Premier League, La Liga and Serie A. Until then, it
                is all on the podcast.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="/podcast">Watch the podcast</Button>
                <Button href={site.socials.instagram} external variant="ghost">
                  Follow for updates
                </Button>
              </div>
            </div>
          </div>
        )}

        {lead && (
          <Link
            href={`/blog/${lead.slug}`}
            className="group mb-16 block border-b border-line pb-16"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-volt">
              {lead.category} · Latest
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl leading-[0.95] tracking-tight transition group-hover:text-volt md:text-6xl">
              {lead.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute">
              {lead.excerpt}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-mute">
              {formatPostDate(lead.date)} · {lead.readingTime} min read
            </p>
          </Link>
        )}

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
            <Link href={`/blog/${p.slug}`} className="group block">
              <p className="text-xs uppercase tracking-[0.25em] text-volt">
                {p.category}
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight transition group-hover:text-volt">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{p.excerpt}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-mute">
                {formatPostDate(p.date)} · {p.readingTime} min
              </p>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
