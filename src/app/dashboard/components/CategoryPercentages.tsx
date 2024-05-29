import React from "react";
import Image from "next/image";
import { Category } from "../functions";
import "../style.css";

interface PercentagesProps {
  categories: Category[];
  percentages: number[];
}

const AssetIcons = [
  { name: "property", image: "/icons/asset_images/property.png" },
  { name: "vehicle", image: "/icons/asset_images/vehicle.png" },
  { name: "jewelry", image: "/icons/asset_images/jewelry.png" },
  { name: "electronics", image: "/icons/asset_images/electronics.png" },
];

const Percentages: React.FC<PercentagesProps> = ({
  categories,
  percentages,
}) => {
  return (
    <div className="w-full mx-1 flex align-center items-center justify-between lg:justify-center">
      {categories.map((category, index) => {
        if (index < percentages.length) {
          const matchedIcon = AssetIcons.find(
            (asset) => asset.name === category.category
          );
          const percentage = percentages[index];
          if (matchedIcon) {
            return (
              <div key={index} className="circle custom-radial lg:mx-6">
                <Image
                  src={matchedIcon.image}
                  alt={category.category ? category.category : "Image"}
                  width={20}
                  height={20}
                />
                <p className="font-bold">{percentage}%</p>
              </div>
            );
          }
        } else {
          return <div key={index}>{category.category}</div>;
        }
      })}
     </div>
  );
};

export default Percentages;
