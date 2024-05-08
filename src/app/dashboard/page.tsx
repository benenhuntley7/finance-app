// "use client";
import AssetChart from "./chart";
import Loading from "../loading"
import { getAsset } from "./actions";
import { getMostRecentAssetEntries, getTotalAssetValue } from "../assets/functions";
import { getCategoryTotalValue } from "./functions"

export default async function Dashboard() {
  const data = await getAsset();

  const latestAssetValues = data ? getMostRecentAssetEntries(data!) : null;

  const categoryTotals = latestAssetValues ? getCategoryTotalValue(latestAssetValues) : null;

  const totalAssets = latestAssetValues ? getTotalAssetValue(latestAssetValues) : null;


  return (
    <>
      <div className="w-full">
        <div>{totalAssets}</div>
        <div className="flex align-center justify-center">
          <div className="w-full flex align-center justify-center lg:w-1/4">
            {latestAssetValues && categoryTotals ? (
              <AssetChart data={categoryTotals} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
