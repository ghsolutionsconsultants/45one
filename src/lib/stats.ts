import { site } from "./site";

export type PlatformStat = {
  platform: "YouTube" | "Instagram" | "TikTok";
  href: string;
  /** Primary headline number, e.g. subscribers / followers */
  primary: { value: number | null; label: string };
  /** Secondary number, e.g. total views / total likes */
  secondary: { value: number | null; label: string };
  /** true when the number came from a live source this request */
  live: boolean;
};

export type Stats = {
  platforms: PlatformStat[];
  /** Followers + subscribers summed across every platform that reported. */
  totalAudience: number | null;
  /** Lifetime YouTube views. Needs YOUTUBE_API_KEY. */
  youtubeViews: number | null;
  /** Lifetime TikTok likes. */
  tiktokLikes: number | null;
  /** How many of the platforms answered live this request. */
  reporting: number;
  fetchedAt: string;
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

/**
 * Instagram and TikTok both serve a login wall / bot-block to ordinary
 * browser requests, but both still render full Open Graph tags for link
 * unfurlers, which is exactly what a follower count lives in. We identify
 * honestly as a crawler and read only the public og:description.
 */
const CRAWLER_UA = "facebookexternalhit/1.1";

/** Pulls the og:description out of a public profile page. */
async function fetchOgDescription(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": CRAWLER_UA, accept: "text/html" },
      next: { revalidate: TTL },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i
    );
    return m ? decodeEntities(m[1]) : null;
  } catch {
    return null;
  }
}

function decodeEntities(s: string) {
  return s
    .replace(/&#0?(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

/** Reads "240 Followers", "486 Likes", "1.2M Followers" out of a blurb. */
function countFrom(text: string, word: string): number | null {
  const m = text.match(new RegExp(`([\\d.,]+[KMB]?)\\s+${word}`, "i"));
  return m ? parseCompact(m[1]) : null;
}

/** Cache window for every live lookup (seconds). */
const TTL = 1800;

/* ------------------------------------------------------------------ *
 * Manual fallbacks. Only used when a platform can't be read live.
 * Update these whenever you check your own dashboards.
 * ------------------------------------------------------------------ */
export const manualStats = {
  instagram: { followers: null as number | null, likes: null as number | null },
  tiktok: { followers: null as number | null, likes: null as number | null },
  youtube: { subscribers: null as number | null, views: null as number | null },
};

/* ----------------------------- YouTube ---------------------------- */

async function youtubeViaApi() {
  const key = process.env.YOUTUBE_API_KEY?.trim();
  if (!key || !site.youtube.channelId) return null;

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${site.youtube.channelId}&key=${key}`;
  const res = await fetch(url, { next: { revalidate: TTL } });
  if (!res.ok) return null;

  const json = (await res.json()) as {
    items?: { statistics?: Record<string, string> }[];
  };
  const s = json.items?.[0]?.statistics;
  if (!s) return null;

  return {
    subscribers: Number(s.subscriberCount ?? 0) || null,
    views: Number(s.viewCount ?? 0) || null,
  };
}

/** No-key fallback: read the public channel page. Subscriber count only. */
async function youtubeViaPage() {
  try {
    const res = await fetch(site.youtube.url, {
      headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9" },
      next: { revalidate: TTL },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const m = html.match(/"([\d.,]+[KMB]?) subscribers"/);
    if (!m) return null;
    return { subscribers: parseCompact(m[1]), views: null };
  } catch {
    return null;
  }
}

/* ---------------------------- Instagram --------------------------- */
/**
 * Instagram only exposes follower counts through the official Graph API,
 * which needs a Business/Creator account and a long-lived token.
 * Set INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID to go live.
 */
async function instagramLive() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim();
  if (!token || !userId) return null;

  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/${userId}?fields=followers_count,media_count&access_token=${token}`,
      { next: { revalidate: TTL } }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      followers_count?: number;
      media_count?: number;
    };
    return {
      followers: json.followers_count ?? null,
      likes: null,
      posts: json.media_count ?? null,
    };
  } catch {
    return null;
  }
}

/**
 * No-token route: read the public profile's Open Graph blurb, which reads
 * "240 Followers, 62 Following, 45 Posts - ...".
 */
async function instagramViaOg() {
  const text = await fetchOgDescription(site.socials.instagram);
  if (!text) return null;

  const followers = countFrom(text, "Followers");
  if (followers === null) return null;

  return {
    followers,
    likes: null,
    posts: countFrom(text, "Posts"),
  };
}

/* ------------------------------ TikTok ---------------------------- */
/**
 * TikTok blocks unauthenticated profile reads. The Display API returns real
 * numbers once you've authorised the account, set TIKTOK_ACCESS_TOKEN.
 */
async function tiktokLive() {
  const token = process.env.TIKTOK_ACCESS_TOKEN?.trim();
  if (!token) return null;

  try {
    const res = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=follower_count,likes_count,video_count",
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: TTL },
      }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: { user?: { follower_count?: number; likes_count?: number } };
    };
    const u = json.data?.user;
    if (!u) return null;
    return { followers: u.follower_count ?? null, likes: u.likes_count ?? null };
  } catch {
    return null;
  }
}

/**
 * No-token route: TikTok's unfurl blurb reads
 * "@handle 26 Followers, 4 Following, 486 Likes - ...".
 */
async function tiktokViaOg() {
  const text = await fetchOgDescription(site.socials.tiktok);
  if (!text) return null;

  const followers = countFrom(text, "Followers");
  if (followers === null) return null;

  return { followers, likes: countFrom(text, "Likes") };
}

/* ------------------------------ Public ---------------------------- */

export async function getStats(): Promise<Stats> {
  const [yt, ig, tt] = await Promise.all([
    youtubeViaApi().then((r) => r ?? youtubeViaPage()),
    instagramLive().then((r) => r ?? instagramViaOg()),
    tiktokLive().then((r) => r ?? tiktokViaOg()),
  ]);

  const platforms: PlatformStat[] = [
    {
      platform: "YouTube",
      href: site.socials.youtube,
      primary: {
        value: yt?.subscribers ?? manualStats.youtube.subscribers,
        label: "Subscribers",
      },
      secondary: {
        value: yt?.views ?? manualStats.youtube.views,
        label: "Total views",
      },
      live: Boolean(yt?.subscribers),
    },
    {
      platform: "Instagram",
      href: site.socials.instagram,
      primary: {
        value: ig?.followers ?? manualStats.instagram.followers,
        label: "Followers",
      },
      secondary: {
        value:
          ("posts" in (ig ?? {}) ? (ig as { posts: number | null }).posts : null) ??
          manualStats.instagram.likes,
        label: "Posts",
      },
      live: Boolean(ig?.followers),
    },
    {
      platform: "TikTok",
      href: site.socials.tiktok,
      primary: {
        value: tt?.followers ?? manualStats.tiktok.followers,
        label: "Followers",
      },
      secondary: {
        value: tt?.likes ?? manualStats.tiktok.likes,
        label: "Total likes",
      },
      live: Boolean(tt?.followers),
    },
  ];

  const known = platforms
    .map((p) => p.primary.value)
    .filter((v): v is number => typeof v === "number");

  return {
    platforms,
    totalAudience: known.length ? known.reduce((a, b) => a + b, 0) : null,
    youtubeViews: yt?.views ?? manualStats.youtube.views,
    tiktokLikes: tt?.likes ?? manualStats.tiktok.likes,
    reporting: platforms.filter((p) => p.primary.value !== null).length,
    fetchedAt: new Date().toISOString(),
  };
}

/* ---------------------------- formatting -------------------------- */

/** "12.4K" -> 12400 */
export function parseCompact(text: string): number | null {
  const m = text.replace(/,/g, "").match(/^([\d.]+)([KMB])?$/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  const mult = { K: 1e3, M: 1e6, B: 1e9 }[(m[2] ?? "").toUpperCase()] ?? 1;
  return Math.round(n * mult);
}

/** 12400 -> "12.4K" */
export function formatCompact(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) {
    const v = n / 1000;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}K`;
  }
  const v = n / 1_000_000;
  return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`;
}
