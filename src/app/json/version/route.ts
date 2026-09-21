import { NextResponse } from "next/server";

/** Quiet unknown tooling probes that hit /json/version in local preview */
export function GET() {
  return NextResponse.json({ ok: true });
}
