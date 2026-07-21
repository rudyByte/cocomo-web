import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ── Leads (from demo form on MGP) ────────────────────────────────────────────
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  businessName: varchar("business_name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  message: text("message"),
  vertical: varchar("vertical", { length: 50 }).default("general").notNull(),
  source: varchar("source", { length: 100 }).default("website").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Contacts (from company page) ──────────────────────────────────────────────
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  kind: varchar("kind", { length: 30 }).default("general").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Proposals (from Cocomo Media contact form) ────────────────────────────────
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  businessName: varchar("business_name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  brief: text("brief"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
