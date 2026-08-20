import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { img } from "@/lib/images";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { SocialRow } from "@/components/SocialIcons";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to 45one. Sponsorship enquiries, guest requests, press or feedback on the 451 podcast.",
};

const routes = [
  {
    tag: "Brands & agencies",
    title: "Sponsorship and brand work",
    body: "Episode sponsorships, branded segments and social campaigns. Send a brief and we will come back with the media kit, current audience numbers and rates.",
    email: site.contact.email,
    link: { href: "/partner", label: "See what we offer" },
  },
  {
    tag: "Guests & press",
    title: "Come on the show",
    body: "Players, coaches, analysts and anyone with something worth saying about the game. Tell us who you are and what you want to talk about.",
    email: site.contact.email,
    link: { href: "/podcast", label: "Watch an episode first" },
  },
  {
    tag: "Everyone else",
    title: "Just want to talk football",
    body: "A take you need us to hear, a correction, or something you want covered on the pod. The quickest way to reach us is a DM.",
    email: site.contact.email,
    link: { href: "/blog", label: "Read the blog" },
  },
];

const faqs = [
  {
    q: "How quickly do you reply?",
    a: "Within two working days for anything sent through this form, usually sooner for sponsorship enquiries.",
  },
  {
    q: "Do you have a media kit?",
    a: "Yes. Send an enquiry with a rough budget and objective and we will send it straight back with current numbers.",
  },
  {
    q: "Where are you based?",
    a: "South Africa. We cover the PSL and the Premier League with the same weight, and we record weekly.",
  },
  {
    q: "Can you cover our club or event?",
    a: "Often, yes. Tell us the fixture or the date and what access is available and we will let you know quickly.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src={img.stadiumNight}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/85 to-ink" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,10vw,7rem)] leading-[0.85] tracking-tight">
            TELL US WHAT
            <br />
            <span className="text-volt">YOU NEED.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/70 sm:mt-7 sm:text-lg">
            One form, one inbox, one place. Sponsorships, guest requests, press
            or a take you need to get off your chest. It all reaches us here.
          </p>
          <div className="mt-9">
            <SocialRow showLabels />
          </div>
        </div>
      </section>

      {/* ---------- ROUTES ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {routes.map((r, i) => (
            <Reveal key={r.tag} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
                <span className="w-fit rounded-full border border-volt/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-volt">
                  {r.tag}
                </span>
                <h2 className="mt-6 font-display text-2xl leading-tight tracking-tight">
                  {r.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                  {r.body}
                </p>
                <a
                  href={`mailto:${r.email}`}
                  className="mt-6 block text-sm text-volt hover:underline"
                >
                  {r.email}
                </a>
                <Link
                  href={r.link.href}
                  className="mt-2 text-xs uppercase tracking-[0.2em] text-mute hover:text-volt"
                >
                  {r.link.label} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FORM ---------- */}
      <section
        id="form"
        className="relative scroll-mt-24 overflow-hidden border-y border-line bg-ink-2"
      >
        <Image
          src={img.pitchAerial}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Send it through</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
                Start the conversation.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-mute">
                The more you tell us up front, the more useful our first reply
                will be. Budget and timing help most.
              </p>

              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={img.boots}
                  alt="Yellow and black football boots on grass"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              </div>
            </div>

            <InquiryForm />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
        <Eyebrow>Before you ask</Eyebrow>
        <h2 className="mt-5 font-display text-4xl leading-none tracking-tight md:text-5xl">
          The usual questions.
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="bg-ink p-6 sm:p-8">
              <h3 className="font-display text-xl tracking-tight">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
