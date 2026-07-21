import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Zod schema (server-side validation) ──────────────────────────────────────
const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  businessName: z.string().min(2, "Business name required").max(200),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
  vertical: z.string().default("general"),
});

// ── Rate limiting via simple in-memory store (replace with Upstash Redis) ───
const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (limit.count >= 3) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Validate
  const result = LeadSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { error: firstError?.message ?? "Validation failed" },
      { status: 422 }
    );
  }

  // Write to database
  try {
    // Dynamic import to avoid DB module being included in edge bundles
    const { db, leads } = await import("@cocomo/db");
    await db.insert(leads).values({
      name: result.data.name,
      businessName: result.data.businessName,
      email: result.data.email,
      phone: result.data.phone,
      message: result.data.message,
      vertical: result.data.vertical,
      source: "demo-form",
    });
  } catch (err) {
    // If DB not configured, log and continue gracefully (dev mode)
    console.error("[leads API] DB insert failed:", err);
    // In production, this should propagate the error
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }
    // Dev: proceed anyway so form flow is testable without DB
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
