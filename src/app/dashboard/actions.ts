"use server";
import { db } from "@/server/db";
import * as schema from "../../server/db/schema";
import { revalidatePath } from "next/cache";
import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { Asset } from "../assets/functions";

export const getAsset = async () => {
  const { userId: user_id } = auth();

  if (!user_id) {
    redirect("/login");
  }
  const user = await getUser(user_id);

  try {
    if (user) {
      const result = await db
        .select()
        .from(schema.assets)
        .leftJoin(
          schema.assetValuesHistory,
          eq(schema.assets.id, schema.assetValuesHistory.asset_id)
        )
        .where(
          sql`${schema.assets.id} = ${schema.assetValuesHistory.asset_id} AND ${schema.assets.user_id} = ${user.id}`
        )
        .orderBy(schema.assets.category);

      return result as Asset[];
    }
  } catch (error) {
    console.error(error);
  }
};

export const originalCategoryValue = async () => {
  const { userId: user_id } = auth();

  if (!user_id) {
    redirect("/login");
  }
  const user = await getUser(user_id);
  try {

    if (user) {
      const result = await db
        .select()
        .from(schema.assets)
        .leftJoin(schema.assetValuesHistory, eq(schema.assets.id, schema.assetValuesHistory.asset_id))
        .where(
          sql`${schema.assets.id} = ${schema.assetValuesHistory.asset_id} AND ${schema.assets.user_id} = ${user.id}`
        )
        .orderBy(schema.assetValuesHistory.updated_at);
      return result as Asset[];
    }

  } catch (error) {
    console.error(error);
  }
}
