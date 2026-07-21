import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProposalSchema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().optional(),
  brief: z.string().max(3000).optional(),
});

const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.reset) { rateLimitMap.set(ip, { count: 1, reset: now + 60_000 }); return true; }
  if (limit.count >= 3) return false;
  limit.count++; return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip))
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const result = ProposalSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: result.error.issues[0]?.message ?? "Validation failed" }, { status: 422 });

  try {
    const { db, proposals } = await import("@cocomo/db");
    await db.insert(proposals).values(result.data);
  } catch (err) {
    console.error("[proposals API]", err);
    if (process.env.NODE_ENV === "production")
      return NextResponse.json({ error: "Failed to submit." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
