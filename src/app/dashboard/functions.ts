import { getAsset } from "./actions";
import { AssetOutput } from "../assets/functions";
import { formatCurrency } from "../functions/currency";
import AssetIcons from '/icons/asset_images/home.png'

export interface Category {
  category: string | null;
  value: number;
  previousValue?: number;
  comparison?: '↑' | '↓' | '-' | null;
};

export interface AssetDash {
  assets: {
    id: number;
    name: string | null;
    user_id: string | null;
    category: string | null;
  };
  asset_values_history?: {
    id: number;
    updated_at: string | null;
    asset_id: number;
    value: number | null;
  };
};

export interface AssetOutputDash {
  id: number;
  name: string | null;
  category: string | null;
  updated_at?: Date;
  value: number | null;
  previousValue?: number | null;
}

// Calculate percentage values for each category
export const getPercentageValue = (data: Category[], totalValue: number): number[] => {
  const percentage = data.map((category) => {
    return parseFloat(((category.value / totalValue) * 100).toFixed(0))
  })
  return percentage
}
// Updated retrieval for latest asset entries including previous values
export const getMostRecentAndPreviousAssetEntries = (data: AssetDash[]): AssetOutputDash[] => {
  // Include previous value for comparison
  let recentEntries: { [key: number]: { recent: AssetOutputDash, previous?: AssetOutputDash } } = {};

  // Iterate over each Asset
  data.forEach((entry) => {
    const assetId = entry.assets.id;
    const updatedAt = entry.asset_values_history?.updated_at;

  // Check if recentEntries does not exist with given assetId, if true we create the entry 
    if (!recentEntries[assetId]) {
      recentEntries[assetId] = {
        recent: {
          id: entry.assets.id,
          name: entry.assets.name,
          category: entry.assets.category,
          updated_at: new Date(updatedAt!),
          value: entry.asset_values_history!.value,
        },
      };
    } else {
  // We compare updatedAt and the current assets updated_at, assigning the current value and previous value in "previous" & "recent" objects respectively
      const currentRecent = recentEntries[assetId].recent;
      if (updatedAt && new Date(updatedAt) > new Date(currentRecent.updated_at!)) {
        recentEntries[assetId].previous = { ...currentRecent };
        recentEntries[assetId].recent = {
          id: entry.assets.id,
          name: entry.assets.name,
          category: entry.assets.category,
          updated_at: new Date(updatedAt!),
          value: entry.asset_values_history!.value,
        };
      } else if (updatedAt && (!recentEntries[assetId].previous || new Date(updatedAt) > new Date(recentEntries[assetId].previous!.updated_at!))) {
        recentEntries[assetId].previous = {
          id: entry.assets.id,
          name: entry.assets.name,
          category: entry.assets.category,
          updated_at: new Date(updatedAt!),
          value: entry.asset_values_history!.value,
        };
      }
    }
  });
  // Finally we map the values into a new array of objects
  const combinedEntries = Object.values(recentEntries).map(entry => ({
    id: entry.recent.id,
    name: entry.recent.name,
    category: entry.recent.category,
    updated_at: entry.recent.updated_at,
    value: entry.recent.value,
    previousValue: entry.previous ? entry.previous.value : undefined,
  }));

  return combinedEntries;
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
export const getCategoryTotalRawValue = (assetOutputs: AssetOutputDash[]): Category[] => {
  const categoryTotals: { [category: string]: {value: number; previousValue: number;} } = {};

  assetOutputs.forEach((assetOutput) => {
    const category = assetOutput.category;
    const value = assetOutput.value;
    const previousValue = assetOutput.previousValue || 0;

    if (category && value !== null) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = {value: value, previousValue: previousValue};
      } else {
        categoryTotals[category].value += value;
        categoryTotals[category].previousValue += previousValue;
      }
    }
  });

  const categoryArray: Category[] = [];

  for (const category in categoryTotals) {
    const current = categoryTotals[category].value;
    const previous = categoryTotals[category].previousValue;
    let comparison: '↑' | '↓' | "-" | null = null;

    if(previous !== undefined) {
      if(current > previous) {
        comparison = '↑'
      } else if (current < previous) {
        comparison = '↓'
      } else {
        comparison = "-"
      }
    }

    categoryArray.push({
      category: category,
      value: categoryTotals[category].value,
      previousValue: categoryTotals[category].previousValue,
      comparison: comparison,
    });
  }

  return categoryArray;
};
// Compress Values for Chart Presentation
export const formatValues = (num: number): number => {
 return Math.log10(num);  
};
// Compare comparison value and render tailwind text color class
export const getComparisonClass = (comparison: string) => {
  if (comparison === '↑') {
    return 'text-green-500'; 
  } else if (comparison === '↓') {
    return 'text-red-500'; 
  } else {
    return 'text-gray-500'; 
  }
}