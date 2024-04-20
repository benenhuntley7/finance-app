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

export const updateAsset = async (formData: FormData) => {
  const { userId: user_id } = auth();

  if (!user_id) {
    redirect("/login");
  }

  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const value = parseInt(formData.get("value") as string);
  const asset_id = parseInt(formData.get("id") as string);

  try {
    await db.insert(schema.assetValuesHistory).values({ asset_id, value });
    await db.update(schema.assets).set({ category, name }).where(eq(schema.assets.id, asset_id));

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
        )
        .orderBy(schema.assetValuesHistory.updated_at);
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
        )
        .orderBy(schema.assetValuesHistory.updated_at);

      // Extracting asset information
      const { user_id, ...assetInfo } = result[0].assets;

      // Extracting value history objects
      const valueHistory = result.map((item) => ({
        value: item.asset_values_history!.value,
        updated_at: item.asset_values_history!.updated_at,
      }));

      // Constructing the final object
      const finalObject = {
        ...assetInfo,
        value_history: valueHistory,
      };

      return finalObject;
    }
  } catch (err) {
    console.error(err);
  }
};
