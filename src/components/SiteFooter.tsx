import Link from "next/link";
import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import { SocialRow } from "./SocialIcons";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo-glow.png"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span className="font-display text-2xl">
                45<span className="text-volt">one</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              {site.description}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-volt">
              New episode every {site.release.day} at {site.release.time}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="mb-1 text-xs uppercase tracking-[0.25em] text-mute">Explore</p>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-bone/80 hover:text-volt">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="text-sm text-bone/80 hover:text-volt">
              Get in touch
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-mute">Follow</p>
            <SocialRow size="sm" showLabels />
            <a
              href={`mailto:${site.contact.partnerships}`}
              className="mt-4 text-sm text-bone/80 hover:text-volt"
            >
              {site.contact.partnerships}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Made in South Africa 🇿🇦</p>
        </div>
      </div>
    </footer>
  );
}
