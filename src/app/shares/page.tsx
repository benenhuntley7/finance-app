"use server";

import { getSharePurchases } from "./addShares/actions";
import SharePortfolioChart from "./chart";
import { calculateChartData, combineShares } from "./functions";
import { ShareTable } from "./components/ShareTable";
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
          {<ShareTable sharePurchases={combinedShares} />}
        </>
      ) : null}
    </main>
  );
}
