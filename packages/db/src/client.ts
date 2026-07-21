import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Gracefully handle missing DATABASE_URL in dev (before DB is provisioned)
const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL environment variable is required in production");
}

export const db = connectionString
  ? drizzle(neon(connectionString))
  : (null as unknown as ReturnType<typeof drizzle>);
