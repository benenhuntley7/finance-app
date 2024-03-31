"use server";

import { getQuote } from "@/server/api/yahooFinance";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { eq, like, sql } from "drizzle-orm";

// Define the type for the getShare function
export const getShare = async (shareId: string) => {
  try {
    const result = await getQuote(shareId);

    // If share company exists, check if it is in search history db. If not, add it for future lookups.
    if (result) {
      const searchHistoryResult = await db
        .select()
        .from(schema.shareSearchHistory)
        .where(eq(schema.shareSearchHistory.symbol, shareId.toUpperCase()));

      if (!searchHistoryResult.length) {
        await db.insert(schema.shareSearchHistory).values({ symbol: shareId.toUpperCase(), longName: result.longName });
      }
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getShareList = async (searchString: string) => {
  const searchString2 = `%${searchString}%.AX`;

  try {
    const result = await db
      .select()
      .from(schema.shareSearchHistory)
      .where(sql`symbol LIKE ${searchString2}`);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
