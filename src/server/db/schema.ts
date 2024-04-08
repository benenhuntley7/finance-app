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

export const SharePurchase = pgTable("share_purchase", {
  row_id: serial("row_id").primaryKey(),
  user_id: text("user_id").references(() => user.id),
  symbol: text("symbol").references(() => shareSymbol.symbol),
  purchaseDate: timestamp("purchased_at"),
  share_price: real("share_price"),
  brokerage: real("brokerage"),
});
