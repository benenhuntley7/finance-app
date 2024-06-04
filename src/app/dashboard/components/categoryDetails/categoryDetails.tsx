"use client";
import React from "react";
import { useState } from "react";
import { Category, getComparisonClass } from "../../functions";
import { formatCurrency } from "@/app/functions/currency";
import { AssetOutputDash } from "../../functions";
import "./style.css";

interface DetailsProps {
  categories: Category[] | null; //CategoryRawData function will be passed here
  previousAndRecentAssetValue: AssetOutputDash[] | null;
}

const CategoryDetails: React.FC<DetailsProps> = ({
  categories,
  previousAndRecentAssetValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const handleVisibility = () => {
    return isOpen ? "open fade" : "";
  };

  return (
    <>
      <div
        onClick={handleMenu}
        className="details text-xs  flex align-center items-center justify-center  text-right text-slate-500 cursor-pointer font-semibold  mb-4 ml-auto border-2 border-slate-600 hover:bg-accent hover:text-black rounded-md px-6 w-10"
      >
        {!isOpen ? "Details" : "\u2716"}
      </div>
      <ul
        className={`${handleVisibility()} content border-y border-slate-400  p-2 custom-radial`}
      >
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
    </>
  );
};

export default CategoryDetails;
