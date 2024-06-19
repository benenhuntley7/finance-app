"use server";

import { db } from "@/server/db";
import * as schema from "../../server/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const userInput = async (formData: FormData) => {
  const { userId: user_id } = auth();

  if (!user_id) {
    redirect("/login");
  }

  const user = await getUser(user_id);

  const name = formData.get("expense_name") as string;
  const value = parseInt(formData.get("expense_value") as string); //currently return NaN
  const category = formData.get("category") as string;
  console.log(value);

  try {
    if (user) {
      await db.insert(schema.expenses).values({ user_id, name, value });
      const result = (
        await db
          .select()
          .from(schema.expenses)
          .where(sql`user_id = ${user_id} ORDER BY created_at DESC LIMIT 1`)
      )[0];
      console.log(result);
      await db
        .insert(schema.expenseCategory)
        .values({ expense_id: result.id, category });
    }
  } catch (error) {
    console.error("Error while performing database operation", error);
  }
};

// export const addCategory = async (formData: FormData) => {
//   return console.log("addCategory");
// };
