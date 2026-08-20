/**
 * Reads an env var, treating blank values as unset. Hosting dashboards happily
 * save an empty string, which would otherwise sail past a `??` default.
 */
function env(name: string): string | undefined {
  const raw = process.env[name];
  const value = raw?.trim();
  return value ? value : undefined;
}

/**
 * Where the site lives. Explicit setting wins, then the URL Vercel assigns,
 * then the intended domain. Always returns something `new URL()` accepts.
 */
function resolveSiteUrl(): string {
  const explicit =
    env("NEXT_PUBLIC_SITE_URL") ??
    env("VERCEL_PROJECT_PRODUCTION_URL") ??
    env("VERCEL_URL");

  const candidate = explicit
    ? explicit.startsWith("http")
      ? explicit
      : `https://${explicit}`
    : "https://45one.co.za";

  try {
    return new URL(candidate).origin;
  } catch {
    return "https://45one.co.za";
  }
}

export const site = {
  name: "45one",
  logoMark: "451",
  tagline: "Football Content",
  description:
    "45one is a South African football content brand. Every Thursday at 08:00 we release the 451 podcast: long-form analysis of the PSL, the Premier League, La Liga, Serie A and the rest of Europe's top leagues.",
  url: resolveSiteUrl(),

  // --- YouTube ---------------------------------------------------------
  // Fill ONE of these in and the video grid auto-updates from the channel
  // RSS feed (no API key required). Find the channel ID by opening the
  // channel page > Share > Copy channel ID (starts with "UC").
  youtube: {
    channelId: env("YOUTUBE_CHANNEL_ID") ?? "UCJF9nMe1hKT22XskyCdlinA",
    handle: "@45oneza",
    url: "https://www.youtube.com/@45oneza",
  },

  socials: {
    instagram: "https://www.instagram.com/45one_za/",
    tiktok: "https://www.tiktok.com/@45one_za_",
    youtube: "https://www.youtube.com/@45oneza",
    x: "",
  },

  contact: {
    general: "hello@45one.co.za",
    partnerships: "partnerships@45one.co.za",
  },

  release: {
    day: "Thursday",
    time: "08:00 SAST",
    cadence: "Every Thursday at 08:00",
  },
} as const;

export const navLinks = [
  { href: "/podcast", label: "Podcast" },
  { href: "/watch", label: "Watch" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/partner", label: "Partner" },
] as const;
