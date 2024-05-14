// "use client";
import './style.css'
import AssetChart from "./chart";
import Loading from "../loading"
import { getAsset } from "./actions";
import { getMostRecentAssetEntries, getTotalAssetValue } from "../assets/functions";
import { formatCurrency } from "../functions/currency";
import { getCategoryTotalValue, getCategoryTotalRawValue } from "./functions"

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
      <main className="main-container w-full flex flex-col">
        <div className="main-content relative flex flex-col align-center justify-start p-4 m-4 border border-solid rounded-md">
          <h1 className="block uppercase tracking-wide text-slate-300 text-sm font-bold ">
            Net Worth Value:
          </h1>
          <p className="text-2xl text-green-400 mb-2">
            {formatCurrency(totalAssets)}
          </p>
          <div className="">
            <h2 className="block uppercase tracking-wide text-slate-300 text-sm font-bold mt-2">
              Details:
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
                    <span className="text-green-400 text-lg ml-4">
                      {formatCurrency(item.value)}
                    </span>
                  </li>
                ))
              ) : (
                <li>No Data Available</li>
              )}
            </ul>
          </div>
          <div className="flex align-center justify-center">
            <div className="w-full flex align-center justify-center lg:w-1/4">
              {latestAssetValues && categoryComputedTotals ? (
                <AssetChart data={categoryComputedTotals} />
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
