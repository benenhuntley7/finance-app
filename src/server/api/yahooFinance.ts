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
    const currentDate = new Date();

    let purchasedDate;
    if (purchasedAt !== undefined) {
      purchasedDate = new Date(purchasedAt);
    } else {
      purchasedDate = currentDate;
    }

    // Set period1 to one year before purchasedAt date
    const period1Date = new Date(purchasedDate.getFullYear() - 1, purchasedDate.getMonth(), purchasedDate.getDate());
    console.log("Period1 Date:", period1Date);

    const formattedPeriod1 = `${period1Date.getFullYear()}-${(period1Date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${period1Date.getDate().toString().padStart(2, "0")}`;
    const queryOptions = { period1: formattedPeriod1 };

    const result = await yahooFinance.chart(symbol, queryOptions);

    const totalResults = result.quotes.length;
    const desiredResultCount = 50;
    let step;

    if (totalResults <= desiredResultCount) {
      step = 1;
    } else {
      step = Math.floor(totalResults / desiredResultCount);
    }

    const formattedData = [];
    for (let i = 0; i < totalResults; i += step) {
      const item = result.quotes[i];
      const date = new Date(item.date);
      const formattedDate = date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });

      formattedData.push({
        date: formattedDate,
        high: parseFloat(item.high!.toFixed(2)),
        low: parseFloat(item.low!.toFixed(2)),
      });
    }

    return formattedData;
  } catch (error) {
    console.error(error);
    // You might want to handle error cases here, depending on your application requirements
    throw error;
  }
}
