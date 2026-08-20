import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";
import { SocialRow } from "@/components/SocialIcons";
import { Button, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "45one is a South African football content brand behind the weekly 451 podcast.",
};

const values = [
  {
    t: "Depth over noise",
    d: "We would rather explain one thing properly than react to ten. Every episode is prepared, and every claim has a reason behind it.",
  },
  {
    t: "The PSL, covered properly",
    d: "South African football is the main event here, not filler between European stories. Then La Liga, Serie A and the Premier League get the same depth.",
  },
  {
    t: "You should learn something",
    d: "The measure of a good episode is simple: you understand the game better at the end of it than you did at the start.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.pitchAerial}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.88] tracking-tight">
              45+1.
              <br />
              <span className="text-volt">THE MINUTE</span>
              <br />
              IT ALL MAKES SENSE.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-mute">
              {site.description}
            </p>
            <div className="mt-9">
              <SocialRow showLabels />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-full bg-volt/10 blur-3xl" />
            <div
              className="relative aspect-square w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/brand/logo-glow.webp')" }}
              role="img"
              aria-label="45one badge"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="What we stand for"
          title="Understanding first."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="bg-ink p-8 md:p-10">
              <h3 className="font-display text-2xl leading-tight tracking-tight">
                {v.t}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mute">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { src: img.ballField, alt: "A ball on an empty pitch", label: "The game" },
            { src: img.cones, alt: "Training cones on a pitch", label: "The work" },
            { src: img.floodlights, alt: "A pitch under floodlights", label: "The stage" },
          ].map((g, i) => (
            <Reveal key={g.src} delay={i * 80}>
              <TiltCard {...g} className="aspect-[4/3]" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-24">
          <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
            Want to talk to us?
          </h2>
          <p className="mt-4 text-mute">
            Sponsorships, guest appearances, press or just a take you need to get
            off your chest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/partner#contact">Partnerships</Button>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
