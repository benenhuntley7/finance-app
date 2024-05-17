// "use client";
import "./style.css";
import AssetChart from "./chart";
import Loading from "../loading";
import { getAsset } from "./actions";
import {
  getMostRecentAssetEntries,
  getTotalAssetValue,
} from "../assets/functions";
import { formatCurrency } from "../functions/currency";
import { getCategoryTotalValue, getCategoryTotalRawValue } from "./functions";

export default async function Dashboard() {
  const data = await getAsset();

  const latestAssetValues = data ? getMostRecentAssetEntries(data!) : null;

  const categoryComputedTotals = latestAssetValues
    ? getCategoryTotalValue(latestAssetValues)
    : null;

  const categoryRawData = latestAssetValues
    ? getCategoryTotalRawValue(latestAssetValues)
    : null;

  const totalAssets = latestAssetValues
    ? getTotalAssetValue(latestAssetValues)
    : null;

  return (
    <>
      <main className="main-container w-full h-screen flex flex-col bg-primary">
        <div className="relative flex flex-col items-center justify-center  mx-1 mt-4 mb-2   lg:justify-center">
          <div className="w-full bg-custom-radial p-2 rounded-md  flex items-center lg:w-1/2">
            <h1 className="block uppercase tracking-wide text-slate-400 text-xs font-bold  ">
              Net Worth:
            </h1>
            <p className="text-2xl text-green-400 ml-auto">
              {formatCurrency(totalAssets)}
            </p>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center  mx-1 mt-4 mb-2   lg:justify-center">
          <div className="w-full bg-custom-radial p-2 rounded-md  flex flex-col mx-auto lg:w-1/2">
            <h2 className="block border-b uppercase tracking-wide text-slate-400 text-sm font-bold mt-2 mb-2 ">
              Details
            </h2>
            <ul>
              {latestAssetValues && categoryRawData ? (
                categoryRawData.map((item, index) => (
                  <li className="flex items-center" key={index}>
                    {" "}
                    <span className="tracking-wide text-slate-300 text-xs font-bold ">
                      {item.category
                        ? item.category?.charAt(0).toUpperCase() +
                          item.category?.slice(1)
                        : null}
                      :
                    </span>
                    <span className="text-green-400 text-lg ml-auto">
                      {formatCurrency(item.value)}
                    </span>
                  </li>
                ))
              ) : (
                <li>No Data Available</li>
              )}
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center  mx-1 mt-4 mb-2   lg:justify-center">
          <div className="w-full bg-custom-radial  p-2 rounded-md  flex items-center lg:w-1/2">
            {latestAssetValues && categoryComputedTotals ? (
              <AssetChart data={categoryComputedTotals} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
