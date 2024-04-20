import { SharePurchase } from "./actions";
import { getShareHistory } from "@/server/api/yahooFinance";
import { ShareHistoryProps } from "./chart";

interface ChartDataEntry {
  priceHistory: any[];
  dividendHistory:
    | {
        amount: any;
        date: any;
      }[]
    | undefined;
}

export interface TableDataEntry {
  symbol: string;
  long_name: string;
  brokerage: number;
  qty: number;
  purchase_price: number;
  current_price: number | null | undefined;
}

export async function calculateChartData(data: SharePurchase[]) {
  let chartData = [];

  const symbols = data
    .map((data) => ({
      symbol: data.symbol,
      purchase_date: data.purchase_date,
      current_price: data.current_price,
      qty: data.qty,
    }))
    .filter(
      (item) => item.symbol !== null && item.purchase_date !== null && item.qty !== null && item.current_price !== null
    );

  // for each purchase, get the share history from the purchase date.
  for (const symbol of symbols) {
    if (symbol.symbol !== null && symbol.purchase_date !== null) {
      const data = await getShareHistory(symbol.symbol, symbol.purchase_date, false);

      // for each entry in price history, multiply the share price by the qty held in the purchase
      data.priceHistory.forEach((entry) => {
        entry.high *= symbol.qty!;
        entry.low *= symbol.qty!;
      });

      chartData.push(data);
    }
  }
  return calculateDailyTotal(chartData);
}

function calculateDailyTotal(chartData: ChartDataEntry[]) {
  const totalDividendsByDate = new Map<string, number>();

  chartData.forEach((entry) => {
    if (entry.priceHistory) {
      entry.priceHistory.forEach((price) => {
        const date = price.date;
        const amount = price.high;
        if (date && amount) {
          if (!totalDividendsByDate.has(date)) {
            totalDividendsByDate.set(date, 0);
          }
          totalDividendsByDate.set(date, totalDividendsByDate.get(date) + amount);
        }
      });
    }
  });

  // Get the sorted array of dates
  const sortedDates = Array.from(totalDividendsByDate.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Format the data into an array of ShareHistoryProps objects
  const formattedData: ShareHistoryProps[] = [];
  sortedDates.forEach((date) => {
    formattedData.push({ date: date, value: parseFloat(totalDividendsByDate.get(date)!.toFixed(2)) });
  });

  return formattedData;
}

export function combineShares(purchases: SharePurchase[]): TableDataEntry[] {
  const totalsArray: TableDataEntry[] = [];

  for (const purchase of purchases) {
    if (!purchase.symbol) continue;
    let totalInfo = totalsArray.find((item) => item.symbol === purchase.symbol);

    if (!totalInfo) {
      totalInfo = {
        symbol: purchase.symbol,
        brokerage: 0,
        qty: 0,
        purchase_price: purchase.purchase_price || 0,
        current_price: purchase.current_price || 0, // Use provided current price or default to 0
        long_name: purchase.long_name || "",
      };
      totalsArray.push(totalInfo);
    }

    totalInfo.brokerage += purchase.brokerage || 0;
    totalInfo.qty += purchase.qty || 0;
  }

  return totalsArray.sort((a, b) => a.symbol.localeCompare(b.symbol));
}
