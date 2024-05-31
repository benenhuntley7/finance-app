import React from "react";
import { Category, getComparisonClass } from "../functions";
import { formatCurrency } from "@/app/functions/currency";
import { AssetOutputDash } from "../functions";
import "../style.css"

interface DetailsProps {
  categories: Category[]; //CategoryRawData function will be passed here
  previousAndRecentAssetValue: AssetOutputDash[];
}

const CategoryDetails: React.FC<DetailsProps> = ({
  categories,
  previousAndRecentAssetValue,
}) => {
  return (
    <details className="details text-right text-slate-400 cursor-pointer">
      <summary className="font-semibold  mb-4">Details</summary>
      <ul className="content border border-slate-400 rounded p-2 custom-radial">
        {previousAndRecentAssetValue && categories ? (
          categories.map((item, index) => (
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
                  className={`text-sm ${getComparisonClass(item.comparison!)}`}
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
  )
};

export default CategoryDetails;
