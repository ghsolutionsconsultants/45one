# 45one — Football Content Hub

Next.js 16 (App Router) + Tailwind v4 site for **45one / the 451 podcast**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Live stats

The site shows live audience numbers on the homepage and the `/partner` page.
Each platform degrades gracefully: no credentials means that card shows the
handle and a "View profile" link instead of a fake number.

**All three platforms are live with zero configuration.**

| Platform | Live number | How |
|---|---|---|
| **YouTube** | Subscribers | Public channel page |
| **Instagram** | Followers, post count | Public `og:description` |
| **TikTok** | Followers, lifetime likes | Public `og:description` |

Instagram and TikTok serve a login wall to ordinary browser requests, but both
still render full Open Graph tags for link previews — and the follower count
lives in that tag. We identify as a link unfurler and read only that public
tag. Everything is cached for 30 minutes, so it is three requests an hour.

Adding `YOUTUBE_API_KEY` additionally unlocks **lifetime channel views** and
**per-video view + like counts** under every thumbnail.

### Instagram in production

Instagram serves its `og:description` to a laptop but blocks requests coming
from Vercel's datacentre IPs, so the live fetch returns nothing once deployed.
Rather than show a gap, the numbers are also fetched every six hours by
`.github/workflows/refresh-stats.yml`, which runs `scripts/refresh-stats.mjs`
on GitHub's runners and commits `content/stats.json`. The site falls back to
that file, so the Instagram figure stays current within a few hours.

Run it by hand any time from the repo's **Actions** tab, or locally with:

```bash
node scripts/refresh-stats.mjs
```

A card only shows the pulsing **LIVE** badge when the number came from a live
request in that render, so a snapshot figure is never presented as real-time.

### If a number ever stops updating

The og:description route depends on Instagram and TikTok keeping their link
previews working. If either changes format, that card falls back — first to an
official-API path (`INSTAGRAM_ACCESS_TOKEN` / `TIKTOK_ACCESS_TOKEN`, both
already coded), then to `manualStats` in `src/lib/stats.ts`, and finally to a
handle + profile link. The page never shows a zero or a broken number.

Worth a glance every few months: if a card shows your handle instead of a
count, that platform stopped answering.

## The things to fill in

Copy `.env.example` to `.env.local`, then:

1. **Contact addresses** — `src/lib/site.ts`. `hello@45one.co.za` and
   `partnerships@45one.co.za` are placeholders until those mailboxes exist.
2. **`YOUTUBE_API_KEY`** — unlocks view and like counts (see table above).
3. **`RESEND_API_KEY`** (optional) — makes the enquiry form actually email
   you. Without it, submissions are logged to the server console.

Channel ID (`UCJF9nMe1hKT22XskyCdlinA`), YouTube, Instagram and TikTok URLs
are already wired to the real accounts.

## Writing a blog post

There are no published articles yet. The blog shows a designed "coming soon"
panel until the first file lands, and the homepage skips the blog section
entirely while it is empty.

Three fully written example articles are parked in `content/drafts/` if you
want a starting point. Move one into `content/posts/` to publish it, or write
your own: add a markdown file to `content/posts/`:

```markdown
---
title: "Your headline"
excerpt: "One or two lines shown on the blog index."
date: "2026-08-20"
author: "45one"
category: "Analysis"
---

Your article, in markdown.
```

It appears on `/blog` automatically, sorted newest first, with reading time
calculated for you.

## Interactive pieces

| Widget | Where | What it does |
|---|---|---|
| Cinematic intro | Every page, once per session | Curtain, badge ignition, wipe reveal. Skipped for reduced-motion users |
| Tactics board | Homepage | Five formations, tap any player for their real job. The flagship widget |
| Live countdown | Hero + podcast page | Counts down to Thursday 08:00 SAST, rolls over automatically |
| Football IQ quiz | Homepage | Five tactical questions, each answer followed by the reasoning, then a score |
| Live stat counters | Homepage + partner | Animate up when scrolled into view |
| Tilt cards | Gallery, about | Images tip toward the cursor |
| Back to top | Every page, bottom right | Doubles as a scroll-progress ring |
| Scroll reveals | Throughout | Sections fade and lift into place |

## Photography

Football imagery lives in `public/images` and is mapped in `src/lib/images.ts`.
All shots are from Pexels (free to use, no attribution required) and were
picked to be object-led: pitches, balls, boots, floodlights and training kit,
with no people in frame. Swap any file in place and keep the filename to
change a photo everywhere it appears.

## Structure

| Path | What it is |
|---|---|
| `/` | Hero, latest episode, what we do, blog teasers, sponsor CTA |
| `/podcast` | Every episode, featured latest, in-page player |
| `/watch` | Full video grid + social CTA |
| `/blog`, `/blog/[slug]` | Markdown-driven articles |
| `/about` | Brand story and values |
| `/partner` | Media kit: packages, live numbers, pitch |
| `/contact` | The one contact page. Routes for brands, guests and everyone else, plus the enquiry form and FAQ |

Videos play in an in-page lightbox using `youtube-nocookie` — nothing loads
from YouTube until someone presses play, so the pages stay fast.

## Voice

45one is a knowledge-first brand, not a hot-take one. Headline is
**FOOTBALL, IN DEPTH.** Copy explains rather than provokes: analysis,
context and "the why behind the result". Two house rules:

- **No em dashes** anywhere in copy.
- Avoid "unfiltered", "hot takes", "no filler", "settle it" and similar
  engagement-bait framing.

## Brand assets

`public/brand/logo-glow.webp` (and the .png beside it) is the badge with its
black background converted to real transparency, so the glow composites onto
photography with no square edge. It is rendered as a CSS background image
rather than `next/image` in the hero, intro and about page: inside those
animated, isolated stacking contexts Chrome fails to paint the large
transparent bitmap through `next/image`. Keep it as a background image there.
`logo-dark.png` is retained for the favicon and social preview.

## Brand tokens

Defined in `src/app/globals.css`: `--color-ink` (black), `--color-volt`
(neon yellow `#f2ff00`), `--color-bone`, `--color-mute`. Display type is
Anton, body is Inter.

## Deploying

The repo lives at `github.com/ghsolutionsconsultants/45one`.

This is a server-rendered Next.js app, so it needs a host that runs Node. It
will not work on GitHub Pages as-is: Pages only serves static files, which
would break the `/api/contact` form and freeze the live follower counts at
build time.

**Recommended: Vercel** (free tier covers this site comfortably)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import `ghsolutionsconsultants/45one`. Vercel detects Next.js on its own,
   so every build setting can stay as-is.
3. Add the environment variables from `.env.example` under Settings →
   Environment Variables. None are required for a first deploy, but set
   `NEXT_PUBLIC_SITE_URL` to the live domain once you have one.
4. Deploy. Every push to `main` redeploys automatically.

Netlify, Render and Railway all work the same way if you prefer them.

**Custom domain**: add it in Vercel under Settings → Domains, point the DNS
records it gives you, then set `NEXT_PUBLIC_SITE_URL` to match so the sitemap
and social previews use the right address.

**If you specifically need GitHub Pages**, the site can be switched to a
static export, at the cost of the contact form (it would need a third-party
form service) and live stats only refreshing when the site rebuilds.
