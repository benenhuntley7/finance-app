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
    <main className="flex flex-col items-center px-2 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3 justify-center items-center">
        {combinedShares && chartData ? (
          <>
            <div className="flex mt-3 align-center items-center w-full justify-between">
              <p>
                Current Portfolio Value: $
                {combinedShares.reduce((total, share) => total + share.current_price! * share.qty, 0).toFixed(2)}
              </p>

              <Link href="/shares/addShares" className="btn btn-outline">
                Add Holding
              </Link>
            </div>
            <div className="w-full h-48 md:h-72 mt-5">
              <SharePortfolioChart data={chartData} />
            </div>
            {<ShareTable sharePurchases={combinedShares} />}
          </>
        ) : null}
      </div>
    </main>
  );
}
