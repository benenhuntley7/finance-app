"use client";

import { useRef } from "react";
import { Asset } from "./[id]/page";
import { addAsset, updateAsset } from "./actions";
import Button from "./button";
import { capitaliseWords } from "./functions";

const ASSET_TYPE = [
  { name: "property", image: "/icons/asset_images/home.png" },
  { name: "vehicle", image: "/icons/asset_images/car.png" },
  { name: "jewelry", image: "/icons/asset_images/diamond.png" },
  { name: "electronics", image: "/icons/asset_images/television.png" },
];

const inputClass =
  "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

export default function Form({ asset }: { asset?: Asset }) {
  const asset_category = asset?.category ? asset.category : "";
  const asset_value = asset?.value_history[0]?.value ?? 0;
  const asset_name = asset?.name ? asset.name : "";
  const asset_id = asset?.id ? asset.id : "";

  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className="w-full mt-5"
      ref={ref}
      action={
        asset
          ? async (formData) => updateAsset(formData)
          : async (formData) => {
              addAsset(formData);
              ref.current?.reset();
            }
      }
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <input type="hidden" value={asset_id} id="id" name="id" />
          <input type="hidden" value={asset_value} id="original_value" name="original_value" />
          <label className="block uppercase tracking-wide text-slate-600 text-xs font-bold mb-2" htmlFor="category">
            Asset Type
          </label>
          <AssetList category={asset_category} />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-slate-600 text-xs font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={inputClass}
            id="name"
            name="name"
            type="text"
            defaultValue={capitaliseWords(asset_name)}
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-slate-600 text-xs font-bold mb-2" htmlFor="value">
            Value
          </label>
          <input
            className={inputClass}
            id="value"
            name="value"
            type="number"
            min={0}
            defaultValue={asset_value}
            required
          />
        </div>
        <div className="w-full mx-3">
          <label className="block uppercase tracking-wide text-slate-600 text-xs font-bold mb-2 invisible">-</label>
          <Button update={asset ? true : false} />
        </div>
      </div>
    </form>
  );
}

const AssetList = ({ category }: { category?: string }) => {
  const defaultValue = category ? category : "";

  return (
    <>
      <select className={inputClass} id="category" name="category" defaultValue={defaultValue}>
        {ASSET_TYPE.map((asset, index) => (
          <option key={index} value={asset.name.toLowerCase()}>
            {capitaliseWords(asset.name)}
          </option>
        ))}
      </select>
    </>
  );
};
