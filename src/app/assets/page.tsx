import "./style.css";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../functions/currency";
import { getAssets } from "./actions";
import Form from "./form";
import {
  AssetOutput,
  capitaliseWords,
  getMostRecentAssetEntries,
  getTotalAssetValue,
} from "./functions";

export default async function Assets() {
  const assets = await getAssets();

  // Now that assets is resolved, pass it to getMostRecentAssetEntries
  const latestAssetValues = assets ? getMostRecentAssetEntries(assets!) : null;
  // Now total each asset value to get the total value of the users assets
  const totalAssets = latestAssetValues
    ? getTotalAssetValue(latestAssetValues)
    : null;

  return (
    <main className="min-h-custom w-full  flex flex-col items-center px-6 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3">
        <h1 className="flex text-slate-600 font-bold my-5 w-full justify-center">
          Assets
        </h1>
        <div className="flex w-full justify-left">
          <div className="flex flex-col text-center">
            <p className="text-[#00f71d] bg-black bg-opacity-15 rounded-3xl">
              {formatCurrency(totalAssets).trim().slice(0, -3)}
            </p>
            <p className="text-xs text-slate-600">CURRENT ASSET VALUE</p>
          </div>
        </div>
        <Form />
        {latestAssetValues && latestAssetValues.length > 0 && (
          <div className="overflow-x-scroll mb-2 md:overflow-auto w-full">
            <AssetTable assets={latestAssetValues} />
          </div>
        )}
      </div>
    </main>
  );
}

const AssetTable = async ({ assets }: { assets: AssetOutput[] }) => {
  // Sort assets by category
  // Sort assets by category and then by name
  assets.sort((a, b) => {
    // Compare categories
    if (a.category! < b.category!) return -1;
    if (a.category! > b.category!) return 1;

    // If categories are   the same, compare names
    if (a.name! < b.name!) return -1;
    if (a.name! > b.name!) return 1;

    return 0; // If both category and name are the same
  });

  return (
    <table className="table bg-white bg-opacity-40 table-zebra table-sm md:table-md">
      <thead>
        <tr>
          <td className="hidden md:block"></td>
          <td className="text-slate-600">Category</td>
          <td className="text-slate-600">Asset Name</td>
          <td className="text-slate-600">Asset Value</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset, index) => (
          <tr key={index}>
            <td className="w-16 hidden md:block">
              <Image
                alt="property-type"
                width="25"
                height="25"
                src={`/icons/asset_images/${asset.category}.png`}
              ></Image>
            </td>
            <td>{capitaliseWords(asset.category as string)}</td>
            <td>{capitaliseWords(asset.name as string)}</td>
            <td>{formatCurrency(asset.value).trim().slice(0, -3)}</td>
            <td className="justify-end text-right min-w-full">
              <div className="flex gap-3">
                <Link href={`/assets/${asset.id}`}>
                  <Image
                    alt="edit"
                    width="20"
                    height="20"
                    src="/icons/edit.png"
                  />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
