import { pgTable, text, jsonb, timestamp, serial } from "drizzle-orm/pg-core";

export const siteContent = pgTable("site_content", {
  section: text("section").primaryKey(),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  name: text("name"),
  email: text("email").notNull(),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
