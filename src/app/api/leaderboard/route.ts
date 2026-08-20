import { NextResponse } from "next/server";
import {
  addEntry,
  cleanEntry,
  isConfigured,
  topEntries,
} from "@/lib/leaderboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json({ configured: false, entries: [] });
  }

  try {
    return NextResponse.json({ configured: true, entries: await topEntries() });
  } catch {
    return NextResponse.json(
      { configured: true, entries: [], error: "Could not read the leaderboard" },
      { status: 502 }
    );
  }
}

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json({ configured: false, saved: false });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ saved: true }); // honeypot

  const entry = cleanEntry(body);
  if (!entry) {
    return NextResponse.json({ error: "Check your details" }, { status: 400 });
  }

  try {
    await addEntry(entry);
    return NextResponse.json({
      configured: true,
      saved: true,
      entries: await topEntries(),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not save your score right now" },
      { status: 502 }
    );
  }
}
