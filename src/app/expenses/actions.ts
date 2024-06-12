"use server";

import { db } from "@/server/db";
import * as schema from "../../server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUser } from "@/server/api/user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const userInput = async (formData: FormData) => {

    // Function to handle user input [Expenses]

}