import { NextResponse } from "next/server";
import { z } from "zod";
import { logServerTelemetry } from "@/lib/telemetry";

const schema = z.object({
  level: z.enum(["error", "warn", "info"]),
  source: z.string().min(1),
  message: z.string().min(1),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  logServerTelemetry(parsed.data);
  return NextResponse.json({ ok: true });
}
