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

export interface AssetOutput {
  id: number;
  name: string | null;
  category: string | null;
  updated_at: Date | null;
  value: number | null;
}

// Function to find the entry with the most recent updated_at timestamp
export const getMostRecentAssetEntries = (data: Asset[]): AssetOutput[] => {
  let recentEntries: { [key: number]: AssetOutput } = {}; // Type specifying that keys are numbers and values are AssetOutput objects

  data.forEach((entry) => {
    const assetId = entry.assets.id;
    const updatedAt = entry.asset_values_history?.updated_at;

    if (
      !recentEntries[assetId] ||
      (updatedAt &&
        recentEntries[assetId].updated_at &&
        new Date(updatedAt) > new Date(recentEntries[assetId].updated_at))
    ) {
      recentEntries[assetId] = {
        id: entry.assets.id,
        name: entry.assets.name,
        category: entry.assets.category,
        updated_at: new Date(updatedAt!),
        value: entry.asset_values_history!.value,
      };
    }
  });
  const returnValues = Object.values(recentEntries);

  return returnValues;
};

export const getTotalAssetValue = (data: AssetOutput[]): number => {
  return data.reduce((total, asset) => total + (asset.value ? asset.value : 0), 0);
};

export const capitaliseWords = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
