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
      <div className="max-h-32 flex">
        <ul className={`${handleVisibility()} content py-2 w-full`}>
          {previousAndRecentAssetValue && categories ? (
            categories.map((item, index) => (
              <li className="flex items-center" key={index}>
                {" "}
                <span className="tracking-widest text-white text-xs">
                  {item.category
                    ? item.category?.charAt(0).toUpperCase() +
                      item.category?.slice(1)
                    : null}
                  :
                </span>
                <span className="text-[#90EA8E] tracking-widest text-lg ml-auto mr-auto">
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
        <button
          onClick={handleMenu}
          className="details text-xl flex align-center items-center justify-end cursor-pointer font-semibold rounded-md mt-auto mb-2  "
        >
          {isOpen ? "\u2716" : "\u27A4"}
        </button>
      </div>
    </>
  );
};

export default CategoryDetails;
