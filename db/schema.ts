import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id").references(() => items.id).notNull(),
  desregula: boolean("desregula").notNull(),
});

export const insertItemSchema = createInsertSchema(items);
export const selectItemSchema = createSelectSchema(items);
export type InsertItem = typeof items.$inferInsert;
export type SelectItem = typeof items.$inferSelect;

export const insertVoteSchema = createInsertSchema(votes);
export const selectVoteSchema = createSelectSchema(votes);
export type InsertVote = typeof votes.$inferInsert;
export type SelectVote = typeof votes.$inferSelect;