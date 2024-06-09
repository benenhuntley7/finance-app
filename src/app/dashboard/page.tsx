// "use client";
import "./style.css";
import Loading from "../loading";
import { getAsset } from "./actions";
import Percentages from "./components/categoryPercentages/CategoryPercentages";
import CategoryDetails from "./components/categoryDetails/categoryDetails";
import NetWorth from "./components/NetWorth/NetWorth";
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
      <main className="main-container min-h-custom px-2 flex flex-col lg:items-center">
        <div className="relative  bg-gradient-to-r from-customGradient to-customGradientTo z-0 w-full min-h-48 mt-2 rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-md shadow-black lg:w-2/6">
          <div className="m-3 p-1">
            <NetWorth netWorth={totalAssets} />
          </div>

          <div className="absolute bg-white bg-opacity-30 w-full min-h-32 bottom-0 rounded-tl-3xl rounded-br-3xl">
            <div className="px-4">
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
        </div>
        <div className="w-full flex flex-wrap mt-4 lg:w-2/6">
          {categoryRawData && categoryPercentage ? (
            <Percentages
              categories={categoryRawData}
              percentages={categoryPercentage}
            />
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </>
  );
}
