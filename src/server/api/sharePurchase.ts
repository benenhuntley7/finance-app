import { auth } from "@clerk/nextjs";
import { db } from "../db";
import * as schema from "../db/schema";
import { sql } from "drizzle-orm";

export const getPurchases = async (userId: string) => {
  try {
    const purchases = db
      .select()
      .from(schema.sharePurchase)
      .where(sql`user_id=${userId}`);

    return purchases;
  } catch (err) {
    console.error(err);
  }
};
