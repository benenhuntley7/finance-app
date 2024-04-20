"use server";

import { db } from "@/server/db";
import * as schema from "../../server/db/schema";
import { revalidatePath } from "next/cache";
import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { Asset } from "./functions";

export const addAsset = async (formData: FormData) => {
  const { userId: user_id } = auth();

  if (!user_id) {
    redirect("/login");
  }
  const user = await getUser(user_id);

  // Validate input here....

  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const value = parseInt(formData.get("value") as string);

  try {
    if (user) {
      await db.insert(schema.assets).values({ user_id, category, name });

      const result = (
        await db
          .select()
          .from(schema.assets)
          .where(sql`user_id = ${user_id} ORDER BY created_at DESC LIMIT 1`)
      )[0];

      await db.insert(schema.assetValuesHistory).values({ asset_id: result.id, value });

      console.log(result);
    } else {
    }

    revalidatePath("/assets");
  } catch (error) {
    console.error(error);
  }
};

export const getAssets = async () => {
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
        );
      return result as Asset[];
    }
  } catch (err) {
    console.error(err);
  }
};

export const getAsset = async (id: string) => {
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
          sql`${schema.assets.id} = ${schema.assetValuesHistory.asset_id} AND ${schema.assets.user_id} = ${
            user.id
          } AND ${schema.assets.id} = ${parseInt(id, 10)}`
        );
      console.log(result[0]);
      return result[0] as Asset;
    }
  } catch (err) {
    console.error(err);
  }
};
