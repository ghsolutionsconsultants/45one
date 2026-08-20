"use client";

/**
 * The badge, orbited by a rotating type ring and a slow pulse. The asset is a
 * pre-cut transparent PNG (public/brand/logo-glow.png) so the glow composites
 * straight onto whatever is behind it, with no blend mode needed.
 */
export default function HeroBadge() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-volt/20 blur-[70px]" />
      <div className="absolute inset-[26%] rounded-full bg-volt/15 blur-[40px]" />

      {/* rotating type ring */}
      <svg
        viewBox="0 0 200 200"
        className="ring-spin absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <path
            id="badge-ring"
            d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          className="fill-volt/45 text-[7.5px] uppercase"
          style={{ letterSpacing: "0.42em" }}
        >
          <textPath href="#badge-ring" startOffset="0">
            451 podcast · every thursday 08:00 · football in depth · 451
            podcast · every thursday 08:00 ·
          </textPath>
        </text>
      </svg>

      {/* pulse rings */}
      <span className="pulse-ring absolute inset-[16%] rounded-full border border-volt/25" />
      <span
        className="pulse-ring absolute inset-[16%] rounded-full border border-volt/20"
        style={{ animationDelay: "1.6s" }}
      />

      <div
        className="absolute inset-[15%] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/brand/logo-glow.webp')" }}
        role="img"
        aria-label="45one badge"
      />
    </div>
  );
}
