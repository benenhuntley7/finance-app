"use server";

import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export const updateChanges = async (formData: FormData) => {
  const { userId: user_id } = auth();

  const row_id = parseInt(formData.get("row_id") as string);
  const purchase_date = new Date(formData.get("purchase-date") as string);
  const purchase_price = parseFloat(formData.get("purchase-price") as string);
  const brokerage = parseFloat(formData.get("brokerage") as string);
  const qty = parseInt(formData.get("quantity") as string);

  console.log(row_id, purchase_date, purchase_price, brokerage, qty);

  if (!user_id) redirect("/login");

  try {
    await db
      .update(schema.sharePurchase)
      .set({ purchase_date, purchase_price, brokerage, qty })
      .where(sql`row_id = ${row_id} AND user_id = ${user_id}`);
  } catch (err) {
    console.error(err);
  }
};
