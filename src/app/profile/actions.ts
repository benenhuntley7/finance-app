"use server";

import { db } from "@/server/db";
import * as schema from "../../server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const updateUser = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  const user = await getUser(userId);

  // Validate input here....

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const income = parseFloat((formData.get("income") as string).replace(/[$,]/g, "")); // Remove non-numeric characters (dollar sign and commas) from income string

  try {
    if (user) {
      await db
        .update(schema.user)
        .set({ firstName: firstName, lastName: lastName, email: email, income: income })
        .where(eq(schema.user.id, userId));
    } else {
      await db
        .insert(schema.user)
        .values({ id: userId, firstName: firstName, lastName: lastName, email: email, income: income });
    }

    revalidatePath("/profile");
  } catch (error) {
    console.error(error);
  }
};
