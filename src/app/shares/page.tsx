"use server";

import { getSharePurchases } from "./addShares/actions";
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
    <main className="flex flex-col items-center px-2 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3 justify-center items-center">
        {combinedShares && chartData ? (
          <>
            <div className="flex mt-3 align-center items-center w-full justify-between">
              <p>
                Current Portfolio Value:
                {formatCurrency(combinedShares.reduce((total, share) => total + share.current_price! * share.qty, 0))}
              </p>

              <Link href="/shares/addShares" className="btn btn-outline">
                Add Holding
              </Link>
            </div>
            <div className="w-full h-36 md:h-60 mt-5">
              <SharePortfolioChart data={chartData} />
            </div>
            <div className="overflow-x-scroll md:overflow-auto">{<ShareTable sharePurchases={combinedShares} />}</div>
          </>
        ) : null}
      </div>
    </main>
  );
}
