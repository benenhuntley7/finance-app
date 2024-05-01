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
  const numStr = num.toString();
  const trimmedStr = numStr.replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");;
  return parseFloat(trimmedStr);
}