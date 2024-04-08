import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../db/schema";

/* export const getPurchases = (userId: String) => {
  const users = db.select().from(schema.SharePurchase).where(eq(schema.SharePurchase.user_id, { userId }));

  return users;
}; */
