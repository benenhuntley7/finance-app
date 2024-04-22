import "./style.css";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../functions/currency";
import { getAssets } from "./actions";
import Form from "./form";
import { AssetOutput, capitaliseWords, getMostRecentAssetEntries, getTotalAssetValue } from "./functions";

export default async function Assets() {
  const assets = await getAssets();

  // Now that assets is resolved, you can pass it to findMostRecentAssetEntries
  const latestAssetValues = assets ? getMostRecentAssetEntries(assets!) : null;
  const totalAssets = latestAssetValues ? getTotalAssetValue(latestAssetValues) : null;

  return (
    <main className="main-container w-full bg-primary flex flex-col items-center px-6 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3">
        <h1 className="flex text-slate-300 font-bold my-5 w-full justify-center">Assets</h1>
        <div className="flex w-full justify-left">
          <div className="flex flex-col text-center">
            <p className="text-slate-300">{formatCurrency(totalAssets).trim().slice(0, -3)}</p>
            <p className="text-xs text-slate-300">CURRENT ASSET VALUE</p>
          </div>
        </div>
        <Form />
        {latestAssetValues && latestAssetValues.length > 0 && (
          <div className="overflow-x-scroll md:overflow-auto w-full">
            <AssetTable assets={latestAssetValues} />
          </div>
        )}
      </div>
    </main>
  );
}

const AssetTable = async ({ assets }: { assets: AssetOutput[] }) => {
  return (
    <table className="table table-zebra table-sm md:table-md">
      <thead>
        <tr>
          <td className="hidden md:block"></td>
          <td>Category</td>
          <td>Asset Name</td>
          <td>Asset Value</td>
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
            <td>{formatCurrency(asset.value)}</td>
            <td className="flex justify-end text-right min-w-20">
              <div className="flex gap-3">
                <Link href={`/assets/${asset.id}`}>
                  <Image alt="edit" width="20" height="20" src="/icons/edit.png" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
