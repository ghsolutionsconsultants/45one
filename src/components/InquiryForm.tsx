"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const budgets = [
  "Under R10,000",
  "R10,000 – R25,000",
  "R25,000 – R50,000",
  "R50,000+",
  "Not sure yet",
];

const interests = [
  "Episode sponsorship",
  "Branded segment",
  "Social campaign (IG / TikTok)",
  "Event or activation",
  "Something else",
];

const field =
  "w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-sm text-bone outline-none transition placeholder:text-mute focus:border-volt";

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Request failed");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-volt/40 bg-ink-2 p-10 text-center">
        <p className="font-display text-3xl tracking-tight text-volt">
          Message received.
        </p>
        <p className="mt-3 text-sm text-mute">
          We&apos;ll come back to you within two working days, usually sooner.
          Urgent? Mail us at{" "}
          <a href={`mailto:${site.contact.partnerships}`} className="text-volt underline">
            {site.contact.partnerships}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <input name="name" required placeholder="Your name" className={field} />
      <input
        name="company"
        placeholder="Company / brand"
        className={field}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className={field}
      />
      <input name="phone" placeholder="Phone (optional)" className={field} />

      <select name="interest" defaultValue="" required className={field}>
        <option value="" disabled>
          What are you interested in?
        </option>
        {interests.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <select name="budget" defaultValue="" required className={field}>
        <option value="" disabled>
          Indicative budget
        </option>
        {budgets.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about the campaign, timing and what success looks like."
        className={`${field} sm:col-span-2`}
      />

      {/* honeypot */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-volt px-8 py-3.5 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-mute">
          Or email{" "}
          <a href={`mailto:${site.contact.partnerships}`} className="text-volt">
            {site.contact.partnerships}
          </a>
        </p>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400 sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
