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

interface SymbolAndPurchasedAt {
  symbol: string;
  purchasedAt: Date; // Adjust the type based on the actual type of purchasedAt
}

export async function getHistory(inputs: SymbolAndPurchasedAt[]) {
  const results = [];

  for (const { symbol, purchasedAt } of inputs) {
    const history = await yahooFinance.chart(symbol, { period1: purchasedAt });
    results.push(history);
  }

  return results;
}
