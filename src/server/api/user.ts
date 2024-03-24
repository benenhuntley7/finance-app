import { db } from "../db";
import * as schema from "../db/schema";
import { sql } from "drizzle-orm";

export const getUsers = () => {
  const users = db.select().from(schema.user);

  return users;
};

export const getUser = async (id: string) => {
  try {
    // Construct the query using .where(schema.user.id.equals(id))
    const user = await db
      .select()
      .from(schema.user)
      .where(sql`id=${id}`);
    return user[0] || null; // Return null if user is not found
  } catch (e) {
    console.error(e);
    return null;
  }
};
