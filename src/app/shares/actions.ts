"use server";

import { getUser } from "@/server/api/user";
import { getQuote } from "@/server/api/yahooFinance";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

// Define the type for the getShare function
export const getShare = async (shareId: string) => {
  try {
    const result = await getQuote(shareId);

    // If share company exists, check if it is in search history db. If not, add it for future lookups.
    if (result) {
      const searchHistoryResult = await db
        .select()
        .from(schema.shareSymbol)
        .where(eq(schema.shareSymbol.symbol, shareId.toUpperCase()));

      if (!searchHistoryResult.length) {
        // if the share has a value and a description then add it to the searchHistory database table.
        if (
          result.regularMarketPrice &&
          result.regularMarketPrice > 0 &&
          result.longName &&
          result.longName.length > 0
        ) {
          await db.insert(schema.shareSymbol).values({ symbol: shareId.toUpperCase(), longName: result.longName });
        }
      }
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getShareList = async (searchString: string) => {
  const searchString2 = `${searchString.toUpperCase()}%.AX`;
  try {
    const result = await db
      .select()
      .from(schema.shareSymbol)
      .where(sql`symbol LIKE ${searchString2}`);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addPurchase = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  const user = await getUser(userId);

  const date = formData.get("purchase-date") as string;
  const purchase_price = parseFloat((formData.get("purchase-price") as string).replace(/[$,]/g, "")); // Remove non-numeric characters (dollar sign and commas) from income string)
  const brokerage = parseFloat((formData.get("brokerage") as string).replace(/[$,]/g, "")); // Remove non-numeric characters (dollar sign and commas) from income string
  const symbol = formData.get("symbol");

  console.log(date);
  console.log(purchase_price);
  console.log(brokerage);
  console.log(symbol);
};
