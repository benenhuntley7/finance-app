"use server";

import { getQuote, getQuotes } from "@/server/api/yahooFinance";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import yahooFinance from "yahoo-finance2";

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
  const { userId: user_id } = auth();

  if (!user_id) redirect("/login");

  const purchase_date = new Date(formData.get("purchase-date") as string);
  const purchase_price = parseFloat((formData.get("purchase-price") as string).replace(/[$,]/g, "")); // Remove non-numeric characters (dollar sign and commas) from income string)
  const brokerage = parseFloat((formData.get("brokerage") as string).replace(/[$,]/g, "")); // Remove non-numeric characters (dollar sign and commas) from income string
  const symbol = formData.get("symbol") as string;

  try {
    await db.insert(schema.sharePurchase).values({ user_id, symbol, brokerage, purchase_price, purchase_date });
  } catch (err) {
    console.error(err);
  }
};

export interface SharePurchase {
  symbol: string | null;
  purchase_date: Date | null;
  purchase_price: number | null;
  current_price: number | null | undefined;
  brokerage: number | null;
  qty: number | null;
}

export const getSharePurchases = async () => {
  const { userId: user_id } = auth();

  if (!user_id) redirect("/login");

  try {
    const result = await db
      .select({
        symbol: schema.sharePurchase.symbol,
        purchase_date: schema.sharePurchase.purchase_date,
        brokerage: schema.sharePurchase.brokerage,
        purchase_price: schema.sharePurchase.purchase_price,
        qty: schema.sharePurchase.qty,
      })
      .from(schema.sharePurchase)
      .where(sql`user_id = ${user_id}`);

    const symbols = result.map((data) => data.symbol).filter((symbol) => symbol !== null); // Filter out null values

    if (symbols && symbols.length > 0) {
      const currentPrices = await getQuotes(symbols);

      // Merge current prices with shareData
      const sharePurchasesWithPrices = result.map((data) => {
        const currentPrice = currentPrices.find((priceData) => priceData.symbol === data.symbol);
        return {
          ...data,
          current_price: currentPrice ? currentPrice.regularMarketPrice : null, // Assuming getQuotes returns an object with a 'regularMarketPrice' property
        };
      });

      return sharePurchasesWithPrices;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
