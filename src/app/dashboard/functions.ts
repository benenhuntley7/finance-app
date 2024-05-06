import { getAsset } from "./actions";

export interface category {
  category: string | null;
  value: number;
};

export interface Asset {
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
}

export const fetchData = async () => {
  try {
    const result = await getAsset();
    if (result !== undefined) {
      
      return result
    } else if (!result) {
      console.log("no result");
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const formattedData =  (data: Asset[]): category[] => {
 const formatted =  data.reduce((result: category[], item) => {

    const existingCategoryIndex = result.findIndex(
      (entry: category) => entry.category === item.assets.category || ""
    );
  
    if (existingCategoryIndex !== -1) {
      // Category already exists, add the value to its accumulated value
      // format value as value by index is found
      result[existingCategoryIndex].value +=
        formatValues(item.asset_values_history?.value || 0);
    } else {
      // New category, add it to the result
      result.push({
        category: item.assets.category || null,
        value: formatValues(item.asset_values_history?.value || 0),
        
      });
    }
    return result;
  }, []);

  return formatted
}

// Compress Values for Chart Presentation
export const formatValues = (num: number): number => {
 return Math.log10(num);  
};