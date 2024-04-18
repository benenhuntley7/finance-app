"use client";

import { addAsset } from "./actions";
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

export default function Form() {
  return (
    <form className="w-full mt-5" action={async (formData) => addAsset(formData)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="category">
            Asset Type
          </label>
          <AssetList />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className={inputClass} id="name" name="name" type="text" />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="value">
            Value
          </label>
          <input className={inputClass} id="value" name="value" type="number" min={0} defaultValue={0} />
        </div>
        <div className="w-full mx-3">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2">-</label>
          <Button />
        </div>
      </div>
    </form>
  );
}

const AssetList = () => {
  return (
    <>
      <select className={inputClass} id="category" name="category">
        {ASSET_TYPE.map((asset, index) => (
          <option key={index} value={asset.name.toLowerCase()}>
            {capitaliseWords(asset.name)}
          </option>
        ))}
      </select>
    </>
  );
};
