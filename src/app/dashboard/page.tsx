// "use client";
// import "./style.css";
import Loading from "../loading";
import { getAsset } from "./actions";
import Percentages from "./components/categoryPercentages/CategoryPercentages";
import CategoryDetails from "./components/categoryDetails/categoryDetails";
import { formatCurrency } from "../functions/currency";
import {
  getMostRecentAssetEntries,
  getTotalAssetValue,
} from "../assets/functions";
import {
  getCategoryTotalRawValue,
  getMostRecentAndPreviousAssetEntries,
  getPercentageValue,
} from "./functions";

export default async function Dashboard() {
  const data = await getAsset();

  const latestAssetValues = data ? getMostRecentAssetEntries(data!) : null;

  const previousAndRecentAssetValue = data
    ? getMostRecentAndPreviousAssetEntries(data!)
    : null;

  const categoryRawData = previousAndRecentAssetValue
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
          <div className="w-full overflow-hidden flex flex-col mx-auto lg:w-1/4">
            {categoryRawData && previousAndRecentAssetValue ? (
              <CategoryDetails
                categories={categoryRawData}
                previousAndRecentAssetValue={previousAndRecentAssetValue}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
