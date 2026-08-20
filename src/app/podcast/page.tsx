import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import { getVideos } from "@/lib/youtube";
import VideoGrid from "@/components/VideoGrid";
import { Button, Eyebrow } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The 451 Podcast",
  description:
    "Every episode of the 451 podcast: South African football talk, released every Thursday.",
};

export default async function PodcastPage() {
  const videos = await getVideos();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.ballTurf}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/88 to-ink" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
          <Eyebrow>{site.release.cadence}</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,10vw,7.5rem)] leading-[0.85] tracking-tight">
            THE 451
            <br />
            <span className="text-volt">PODCAST</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
            Full-length football analysis. The PSL covered properly, the
            Premier League&apos;s money and mistakes, La Liga, Serie A and the
            rest of Europe. The context nobody else makes time for.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.socials.youtube} external>
              Subscribe on YouTube
            </Button>
            <Button href="/partner" variant="ghost">
              Sponsor an episode
            </Button>
          </div>

          <div className="mt-14 max-w-lg">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-mute">
              Next episode drops in
            </p>
            <Countdown />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Reveal>
          <VideoGrid videos={videos} featureFirst />
        </Reveal>
      </section>
    </>
  );
}
