import { getAsset } from "./actions";
import { AssetOutput } from "../assets/functions";
import { Category } from "./types";
import { formatCurrency } from "../functions/currency";

// Unused function in its current state
export const fetchData = async () => {
  try {
    const result = await getAsset();
    if (result !== undefined) {
      console.log(result);
      return result
    } else if (!result) {
      console.log("no result");
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Formatted Category values
export const getCategoryTotalValue = (assetOutputs: AssetOutput[]): Category[] => {
  const categoryTotals: { [category: string]: number } = {};

  assetOutputs.forEach((assetOutput) => {
    const category = assetOutput.category;
    const value = assetOutput.value;

    if (category && value !== null) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = value;
      } else {
        categoryTotals[category] += value;
      }
    }
  });

  const categoryArray: Category[] = [];

  for (const category in categoryTotals) {
    categoryArray.push({
      category: category,
      value: formatValues(categoryTotals[category]),
    });
  }

  return categoryArray;
};
// Raw Category values 
export const getCategoryTotalRawValue = (assetOutputs: AssetOutput[]): Category[] => {
  const categoryTotals: { [category: string]: number } = {};

  assetOutputs.forEach((assetOutput) => {
    const category = assetOutput.category;
    const value = assetOutput.value;

    if (category && value !== null) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = value;
      } else {
        categoryTotals[category] += value;
      }
    }
  });

  const categoryArray: Category[] = [];

  for (const category in categoryTotals) {
    categoryArray.push({
      category: category,
      value: categoryTotals[category],
    });
  }

  return categoryArray;
};
// Compress Values for Chart Presentation
export const formatValues = (num: number): number => {
 return Math.log10(num);  
};