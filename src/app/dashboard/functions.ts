import { getAsset } from "./actions";

interface category {
  category: string
  value: number
}

export const fetchData = async () => {
  try {
    const result = await getAsset();
    if (result !== undefined) {

      return result;
    } else if (!result) {
      console.log("no result");
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};



export const formatValues = (num: number) => {
  const computedNum = Math.log10(num);
  
  return computedNum.toFixed(4);
};