import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  row_id: serial("row_id").primaryKey(),
  id: text("id").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  income: integer("income"),
  income_frequency: integer("income_frequency"),
});

export const shareSearchHistory = pgTable("share_search_history", {
  row_id: serial("row_id").primaryKey(),
  symbol: text("symbol").unique(),
  longName: text("long_name"),
});
