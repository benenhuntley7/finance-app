"use server";

import { getSharePurchases, SharePurchase } from "../shares/actions";
import { getShareHistory } from "@/server/api/yahooFinance";
import SharePortfolioChart, { ShareHistoryProps } from "./chart";

export default async function page() {
  const sharePurchases = await getSharePurchases();

  const chartData = sharePurchases ? await calculateChartData(sharePurchases) : null;

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      {sharePurchases && chartData ? (
        <>
          <div className="w-1/2w-full lg:w-1/2 h-48 md:h-72 mt-5">
            <SharePortfolioChart data={chartData} />
          </div>
          <ShareTable sharePurchases={sharePurchases} />
        </>
      ) : (
        <div className="loading loading-spinner"></div>
      )}
    </main>
  );
}

const ShareTable = ({ sharePurchases }: { sharePurchases: SharePurchase[] }) => {
  return (
    <div className="flex w-full">
      <table className="table table-zebra">
        <thead>
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
              <td>{purchase.symbol && purchase.symbol.split(".")[0].toUpperCase()}</td>
              <td>{purchase.qty}</td>
              <td>${purchase.purchase_price}</td>
              <td>${purchase.current_price}</td>
              <td>${(purchase.current_price! * purchase.qty! + purchase.brokerage!).toFixed(2)}</td>
              <td>${purchase.brokerage}</td>
              <td>
                $
                {(
                  purchase.current_price! * purchase.qty! +
                  purchase.brokerage! -
                  (purchase.purchase_price! * purchase.qty! + purchase.brokerage!)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
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
      qty: data.qty,
    }))
    .filter((item) => item.symbol !== null && item.purchase_date !== null && item.qty !== null);

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

// iterate over each entry in price history and total them according to each day.
function calculateDailyTotal(chartData: ChartDataEntry[]) {
  const totalDividendsByDate = new Map();

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
  // Format the data into an array of ShareHistoryProps objects
  const formattedData: ShareHistoryProps[] = [];
  totalDividendsByDate.forEach((value, key) => {
    formattedData.push({ date: key, value: value });
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
