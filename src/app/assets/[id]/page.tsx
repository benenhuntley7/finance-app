"use server";

import Button from "./button";
import { getAsset } from "../actions";
import { capitaliseWords } from "../functions";
import { formatCurrency } from "@/app/functions/currency";

export default async function Page({ params }: { params: { id: string } }) {
  const { id }: { id: string } = params;

  const asset = await getAsset(id);

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3 justify-center">
        {asset ? (
          <>
            <h1 className="flex w-full font-bold my-5 justify-center">
              {capitaliseWords(asset.assets.name)} - {formatCurrency(asset.asset_values_history?.value)}
            </h1>
          </>
        ) : (
          <div className="flex w-full flex-col justify-center text-center mt-4">
            This asset does not exist.
            <Button />
          </div>
        )}
      </div>
    </main>
  );
}
