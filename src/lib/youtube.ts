import { site } from "./site";

export type Video = {
  id: string;
  title: string;
  description: string;
  published: string; // ISO date
  thumbnail: string;
  url: string;
  views?: number | null;
  likes?: number | null;
};

/**
 * Episodes we know about even before the YouTube channel ID is configured.
 * Add new ones here manually, OR set YOUTUBE_CHANNEL_ID in .env.local and the
 * whole grid fills itself from the channel feed automatically.
 */
export const fallbackVideos: Video[] = [
  {
    id: "ZfgvdkQidqI",
    title:
      "451 EP.1: English Premier League Bad Signings, Big Problems & PSL Pressure!",
    description:
      "Episode one. We break down the Premier League's worst business of the window, the problems money can't fix, and the pressure building in the PSL.",
    published: "2025-08-14T17:00:00.000Z",
    thumbnail: "https://i.ytimg.com/vi/ZfgvdkQidqI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=ZfgvdkQidqI",
  },
];

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
}

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

/**
 * Pulls the latest ~15 uploads from the channel's public RSS feed.
 * No API key, no quota. Revalidated hourly.
 */
export async function getVideos(): Promise<Video[]> {
  const channelId = site.youtube.channelId;
  if (!channelId) return withStats(fallbackVideos);

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return fallbackVideos;
    const xml = await res.text();

    const entries = xml.split("<entry>").slice(1);
    const videos: Video[] = entries.map((entry) => {
      const id = tag(entry, "yt:videoId");
      return {
        id,
        title: tag(entry, "title"),
        description: tag(entry, "media:description").split("\n")[0] ?? "",
        published: tag(entry, "published"),
        thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
      };
    });

    const valid = videos.filter((v) => v.id);
    return withStats(valid.length ? valid : fallbackVideos);
  } catch {
    return fallbackVideos;
  }
}

/**
 * Adds live view/like counts to each video. Requires YOUTUBE_API_KEY
 * (YouTube Data API v3, free quota is far more than this site needs).
 * Without a key the videos simply render without counts.
 */
async function withStats(videos: Video[]): Promise<Video[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || videos.length === 0) return videos;

  try {
    const ids = videos.slice(0, 50).map((v) => v.id).join(",");
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${key}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return videos;

    const json = (await res.json()) as {
      items?: { id: string; statistics?: Record<string, string> }[];
    };
    const byId = new Map(
      (json.items ?? []).map((i) => [i.id, i.statistics ?? {}])
    );

    return videos.map((v) => {
      const s = byId.get(v.id);
      return s
        ? {
            ...v,
            views: Number(s.viewCount ?? 0) || null,
            likes: Number(s.likeCount ?? 0) || null,
          }
        : v;
    });
  } catch {
    return videos;
  }
}

export async function getLatestVideo(): Promise<Video> {
  const [first] = await getVideos();
  return first ?? fallbackVideos[0];
}

export function episodeNumber(title: string): string | null {
  const m = title.match(/EP\.?\s*(\d+)/i);
  return m ? m[1] : null;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
