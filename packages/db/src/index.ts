// Re-export DB client and all schema tables for use in API routes
// This is the @cocomo/db package barrel export

export { db } from "./client";
export { leads, contacts, proposals } from "./schema";
