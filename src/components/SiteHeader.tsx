"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  // Keyed on the route so navigating closes the menu without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-ink/85 backdrop-blur-xl border-b border-line"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image
            src="/brand/logo-glow.png"
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 object-contain md:h-11 md:w-11"
            priority
          />
          <span className="font-display text-lg tracking-tight md:text-2xl">
            45<span className="text-volt">one</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active ? "text-volt" : "text-bone/70 hover:text-bone"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            Get in touch
          </Link>
        </nav>

        <button
          onClick={() => setOpenFor(open ? null : pathname)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-bone transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-6 bg-bone transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-bone transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-line/60 py-4 font-display text-2xl tracking-tight"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 rounded-full bg-volt px-5 py-3.5 text-center font-bold text-black"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
