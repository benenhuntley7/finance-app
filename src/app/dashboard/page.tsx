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
import {
  getCategoryTotalValue,
  getCategoryTotalRawValue,
  getMostRecentAndPreviousAssetEntries,
  getComparisonClass,
  getPercentageValue,
} from "./functions";
import Percentages from "./components/CategoryPercentages";

export default async function Dashboard() {
  const data = await getAsset();

  const latestAssetValues = data ? getMostRecentAssetEntries(data!) : null;

  const previousAndRecentAssetValue = data
    ? getMostRecentAndPreviousAssetEntries(data!)
    : null;

  const categoryComputedTotals = latestAssetValues
    ? getCategoryTotalValue(latestAssetValues)
    : null;

  const categoryRawData = latestAssetValues
    ? getCategoryTotalRawValue(previousAndRecentAssetValue!)
    : null;

  const totalAssets = latestAssetValues
    ? getTotalAssetValue(latestAssetValues)
    : null;

  const categoryPercentage =
    categoryRawData && totalAssets
      ? getPercentageValue(categoryRawData, totalAssets)
      : null;

  return (
    <>
      <main className="main-container px-2 w-full h-screen flex flex-col bg-primary">
        <div className="relative flex flex-col items-center justify-center  mx-1 mt-4 mb-2 lg:justify-center">
          <div className="w-full flex items-center lg:w-1/2">
            <h1 className="block  border-b uppercase tracking-wide text-slate-400 text-xs font-bold">
              Net Worth:
            </h1>
            <p className="text-2xl text-green-400 ml-auto">
              {formatCurrency(totalAssets)}
            </p>
          </div>
          <div className="w-full my-4 lg:w-1/2">
            {categoryRawData && categoryPercentage ? (
              <Percentages
                categories={categoryRawData}
                percentages={categoryPercentage}
              />
            ) : (
              <Loading />
            )}
          </div>
          <div className="w-full rounded-md  flex flex-col mx-auto lg:w-1/2">
            <details className="text-right text-slate-400">
              <summary className="font-semibold">Details</summary>
                <ul className="border border-slate-400 rounded p-2 custom-radial">
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
                          <span
                            className={`text-sm ${getComparisonClass(
                              item.comparison!
                            )}`}
                          >
                            {item.comparison}
                          </span>{" "}
                          {formatCurrency(item.value)}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>No Data Available</li>
                  )}
                </ul>
            </details>
          </div>
        </div>
      </main>
    </>
  );
}
