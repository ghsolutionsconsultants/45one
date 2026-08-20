import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = Record<string, string>;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // honeypot, silently accept, never deliver
  if (body.website) return NextResponse.json({ ok: true });

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const lines = Object.entries(body)
    .filter(([k, v]) => k !== "website" && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const to = site.contact.email;

  // Delivery via Resend when configured; otherwise logged for the dev server.
  const key = process.env.RESEND_API_KEY?.trim();
  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.RESEND_FROM?.trim() || "45one site <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO?.trim() || to],
        reply_to: body.email,
        subject: `New enquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
        text: lines,
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not send right now, please email us directly." },
        { status: 502 }
      );
    }
  } else {
    console.log("[45one] New enquiry:\n" + lines);
  }

  return NextResponse.json({ ok: true });
}
