import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import { getVideos } from "@/lib/youtube";
import VideoGrid from "@/components/VideoGrid";
import { Button, Eyebrow } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Watch",
  description: "Every 45one video: episodes, clips and reactions in one place.",
};

export default async function WatchPage() {
  const videos = await getVideos();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.stadiumEmpty}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
          <Eyebrow>Video hub</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,9vw,6rem)] leading-[0.9] tracking-tight">
            EVERYTHING WE&apos;VE
            <br />
            <span className="text-volt">PUT OUT.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
            Episodes, clips and reactions, playable right here. Nothing loads
            until you press play, so the page stays fast.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-20">
        <VideoGrid videos={videos} />

        <div className="relative mt-20 overflow-hidden rounded-2xl border border-line p-8 text-center md:p-14">
          <Image
            src={img.ballGrass}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="relative">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Short-form lives on the socials
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-mute">
            Short explainers and match-day breakdowns go out daily on
            Instagram and TikTok. Follow so you catch them first.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={site.socials.instagram} external>
              Instagram
            </Button>
            <Button href={site.socials.tiktok} external variant="ghost">
              TikTok
            </Button>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
