"use server";

import { getSharePurchases } from "./actions";
import SharePortfolioChart from "./chart";
import { calculateChartData, combineShares } from "./functions";
import { ShareTable } from "./components/ShareTable";
import Link from "next/link";
import { formatCurrency } from "../functions/currency";

export default async function page() {
  const sharePurchases = await getSharePurchases();

  const combinedShares = sharePurchases ? combineShares(sharePurchases) : null;
  const chartData = sharePurchases ? await calculateChartData(sharePurchases) : null;

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      {combinedShares && chartData ? (
        <div className="flex flex-col w-full md:w-2/3">
          <h1 className="flex font-bold my-5 w-full justify-center">Shares</h1>
          <div className="flex mt-3 align-center items-center w-full justify-between">
            <div className="flex flex-col text-center">
              <p>
                {formatCurrency(combinedShares.reduce((total, share) => total + share.current_price! * share.qty, 0))}
              </p>
              <p className="text-xs">CURRENT PORTFOLIO VALUE</p>
            </div>

            <Link href="/shares/addShares" className="btn btn-outline btn-sm">
              Add Holding
            </Link>
          </div>
          {chartData.length > 0 && (
            <div className="w-full h-36 md:h-60 mt-5">
              <SharePortfolioChart data={chartData} />
            </div>
          )}
          <div className="overflow-x-scroll md:overflow-auto">{<ShareTable sharePurchases={combinedShares} />}</div>
        </div>
      ) : null}
    </main>
  );
}
