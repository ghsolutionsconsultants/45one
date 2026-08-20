"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Video } from "@/lib/youtube";
import { episodeNumber, formatDate } from "@/lib/youtube";
import { formatCompact } from "@/lib/stats";

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function VideoCard({
  video,
  onPlay,
  featured = false,
}: {
  video: Video;
  onPlay: (v: Video) => void;
  featured?: boolean;
}) {
  const ep = episodeNumber(video.title);
  return (
    <article className="group">
      <button
        onClick={() => onPlay(video)}
        className="relative block w-full overflow-hidden rounded-2xl border border-line bg-ink-3 text-left"
        aria-label={`Play ${video.title}`}
      >
        <div className={`relative ${featured ? "aspect-video" : "aspect-video"}`}>
          <Image
            src={video.thumbnail}
            alt=""
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-volt text-black transition duration-300 group-hover:scale-110">
              <PlayIcon className="ml-1 h-7 w-7" />
            </span>
          </span>
          {ep && (
            <span className="absolute left-4 top-4 rounded-full bg-volt px-3 py-1 font-display text-xs tracking-wider text-black">
              EP {ep}
            </span>
          )}
        </div>
      </button>

      <div className="mt-4">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-mute">
          <span>{formatDate(video.published)}</span>
          {typeof video.views === "number" && (
            <>
              <span className="text-volt">·</span>
              <span>{formatCompact(video.views)} views</span>
            </>
          )}
          {typeof video.likes === "number" && video.likes > 0 && (
            <>
              <span className="text-volt">·</span>
              <span>{formatCompact(video.likes)} likes</span>
            </>
          )}
        </p>
        <h3
          className={`mt-2 font-display tracking-tight ${
            featured ? "text-2xl md:text-4xl" : "text-lg md:text-xl"
          }`}
        >
          {video.title}
        </h3>
        {featured && video.description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute">
            {video.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default function VideoGrid({
  videos,
  featureFirst = false,
}: {
  videos: Video[];
  featureFirst?: boolean;
}) {
  const [active, setActive] = useState<Video | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
  }, [active]);

  const [first, ...rest] = videos;
  const grid = featureFirst ? rest : videos;

  return (
    <>
      {featureFirst && first && (
        <div className="mb-16">
          <VideoCard video={first} onPlay={setActive} featured />
        </div>
      )}

      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((v) => (
          <VideoCard key={v.id} video={v} onPlay={setActive} />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-6">
              <h3 className="font-display text-lg md:text-xl">{active.title}</h3>
              <button
                onClick={() => setActive(null)}
                className="shrink-0 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-widest text-bone/80 hover:border-volt hover:text-volt"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
