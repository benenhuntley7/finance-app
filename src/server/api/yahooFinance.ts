"use server";

import yahooFinance from "yahoo-finance2";

type QuoteResult = {
  symbol: string;
  longName: string | undefined;
  regularMarketPrice: number | undefined;
};

// Get quote for mutliple shares
export async function getQuotes(symbols: string[]) {
  const results: QuoteResult[] = [];

  try {
    for (const symbol of symbols) {
      const quote = await yahooFinance.quote(symbol);

      results.push({
        symbol,
        longName: quote.longName,
        regularMarketPrice: quote.regularMarketPrice,
      });
    }

    return results;
  } catch (error) {
    return results; // If an error occurs, return the partial results
  }
}

// Get quote for single share
export async function getQuote(symbol: string) {
  try {
    const quote = await yahooFinance.quote(symbol);

    const result = { symbol, longName: quote.longName, regularMarketPrice: quote.regularMarketPrice };
    return result;
  } catch (error) {
    return null;
  }
}

export async function getShareHistory(symbol: string, purchasedAt?: string) {
  try {
    const purchasedDate = calculateStartDate(purchasedAt);
    const period1 = formatDate(purchasedDate);

    const queryOptions = { period1 };

    const result = await yahooFinance.chart(symbol, queryOptions);

    const formattedPriceHistory = formatPriceHistory(result.quotes);

    return { priceHistory: formattedPriceHistory };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function calculateStartDate(purchasedAt?: string): Date {
  const currentDate = new Date();
  if (purchasedAt) {
    return new Date(purchasedAt);
  } else {
    return new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  }
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

function formatPriceHistory(quotes: any[]): any[] {
  const totalResults = quotes.length;
  const desiredResultCount = 52;
  const step = totalResults <= desiredResultCount ? 1 : Math.floor(totalResults / desiredResultCount);
  const formattedPriceHistory = [];

  for (let i = 0; i < totalResults; i += step) {
    const item = quotes[i];
    const date = new Date(item.date);
    const formattedDate = date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });

    formattedPriceHistory.push({
      date: formattedDate,
      high: parseFloat(item.high!.toFixed(2)),
      low: parseFloat(item.low!.toFixed(2)),
    });
  }

  return formattedPriceHistory;
}
