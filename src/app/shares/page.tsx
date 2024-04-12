"use server";

import { getSharePurchases, SharePurchase } from "./addShares/actions";
import { getShareHistory } from "@/server/api/yahooFinance";
import SharePortfolioChart, { ShareHistoryProps } from "./chart";
import Link from "next/link";

export default async function page() {
  const sharePurchases = await getSharePurchases();

  const combinedShares = sharePurchases ? combineShares(sharePurchases) : null;
  const chartData = sharePurchases ? await calculateChartData(sharePurchases) : null;

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      {combinedShares && chartData ? (
        <>
          <div className="mt-3">
            <Link href="/shares/addShares" className="btn btn-outline">
              Add Holding
            </Link>
          </div>
          <div className="w-1/2w-full lg:w-1/2 h-48 md:h-72 mt-5">
            <SharePortfolioChart data={chartData} />
          </div>
          <ShareTable sharePurchases={combinedShares} />
        </>
      ) : (
        <div className="loading loading-spinner"></div>
      )}
    </main>
  );
}

const ShareTable = ({ sharePurchases }: { sharePurchases: TableDataEntry[] }) => {
  return (
    <div className="flex w-3/5 mt-4">
      <table className="table table-zebra table-sm">
        <thead className="border-b border-black border-3">
          <tr>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Current Value</th>
            <th>Brokerage</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {sharePurchases.map((purchase, index) => (
            <tr key={index}>
              <td>
                <Link className="font-bold underline" href={`/shares/${purchase.symbol.replace(".", "-")}`}>
                  {purchase.symbol && purchase.symbol.split(".")[0].toUpperCase()}
                </Link>
              </td>
              <td>{purchase.qty}</td>
              <td>${purchase.purchase_price}</td>
              <td>${purchase.current_price}</td>
              <td>${(purchase.current_price! * purchase.qty!).toFixed(2)}</td>
              <td>${purchase.brokerage.toFixed(2)}</td>
              <td>
                $
                {(
                  purchase.current_price! * purchase.qty! +
                  purchase.brokerage! -
                  (purchase.purchase_price! * purchase.qty! - purchase.brokerage!)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-black border-3">
          <tr>
            <td>Total</td>
            <td colSpan={3}></td>
            <td>
              $
              {sharePurchases
                .reduce((total, purchase) => total + purchase.current_price! * purchase.qty! + purchase.brokerage!, 0)
                .toFixed(2)}
            </td>
            <td>${sharePurchases.reduce((total, purchase) => total + purchase.brokerage!, 0).toFixed(2)}</td>
            <td>
              $
              {sharePurchases
                .reduce(
                  (total, purchase) =>
                    total +
                    purchase.current_price! * purchase.qty! +
                    purchase.brokerage! -
                    (purchase.purchase_price! * purchase.qty! + purchase.brokerage!),
                  0
                )
                .toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

async function calculateChartData(data: SharePurchase[]) {
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

interface ChartDataEntry {
  priceHistory: any[];
  dividendHistory:
    | {
        amount: any;
        date: any;
      }[]
    | undefined;
}

interface TableDataEntry {
  symbol: string;
  brokerage: number;
  qty: number;
  purchase_price: number;
  current_price: number;
}

function combineShares(data: SharePurchase[]) {
  const combinedDataMap = new Map();

  // Group data by symbol
  data.forEach((entry) => {
    const { symbol, brokerage, qty, purchase_price, current_price } = entry;
    if (!combinedDataMap.has(symbol)) {
      combinedDataMap.set(symbol, {
        brokerage: 0,
        qty: 0,
        purchase_price: 0,
        current_price,
      });
    }
    const existingData = combinedDataMap.get(symbol);
    combinedDataMap.set(symbol, {
      brokerage: existingData.brokerage + brokerage,
      qty: existingData.qty + qty,
      purchase_price: parseFloat((existingData.purchase_price + purchase_price! * qty!).toFixed(2)),
      current_price: existingData.current_price,
    });
  });

  // Format the combined data into an array
  const combinedData: TableDataEntry[] = [];
  combinedDataMap.forEach((values, symbol) => {
    const { brokerage, qty, purchase_price, current_price } = values;
    combinedData.push({
      symbol,
      brokerage,
      qty,
      purchase_price: parseFloat((purchase_price / qty).toFixed(2)), // Calculate average purchase price
      current_price,
    });
  });
  return combinedData;
}
