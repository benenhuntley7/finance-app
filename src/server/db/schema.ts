import { sql } from "drizzle-orm";
import { serial, text, timestamp, pgTable, integer, real } from "drizzle-orm/pg-core";

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

export const shareSymbol = pgTable("share_symbol", {
  row_id: serial("row_id").primaryKey(),
  symbol: text("symbol").unique(),
  longName: text("long_name"),
});

export const sharePurchase = pgTable("share_purchase", {
  row_id: serial("row_id").primaryKey(),
  user_id: text("user_id").references(() => user.id),
  symbol: text("symbol").references(() => shareSymbol.symbol),
  purchase_date: timestamp("purchased_at"),
  purchase_price: real("purchase_price"),
  brokerage: real("brokerage"),
  qty: integer("qty"),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => user.id),
  category: text("category"),
  name: text("name"),
});

export const assetValuesHistory = pgTable("asset_values_history", {
  id: serial("id").primaryKey(),
  asset_id: integer("asset_id")
    .notNull()
    .references(() => assets.id),
  value: real("value"),
  updated_at: timestamp("updated_at").default(sql`now()`),
});
