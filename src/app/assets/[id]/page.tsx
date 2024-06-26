"use server";

import Button from "./button";
import { getAsset } from "../actions";
import { capitaliseWords } from "../functions";
import { formatCurrency } from "@/app/functions/currency";
import Form from "../form";
import HistoryTable from "./components/HistoryTable";
import AssetValueChart from "./components/LineChart";

export default async function Page({ params }: { params: { id: string } }) {
  const { id }: { id: string } = params;

  const asset = await getAsset(id);
  asset?.value_history.reverse(); // flip to descending date order

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3 justify-center">
        {asset ? (
          <>
            <h1 className="flex w-full font-bold my-5 justify-center">
              {capitaliseWords(asset.name)} - {formatCurrency(asset.value_history[0].value).slice(0, -3)}
            </h1>
            <Form asset={asset} />
            <div className="flex w-full justify-center">
              <div className="flex w-full flex-wrap">
                {asset.value_history.length > 1 && (
                  <div className="w-full md:w-1/2 justify-center items-center mt-5 h-48">
                    <AssetValueChart data={asset.value_history} />
                  </div>
                )}
                <div className={`w-full ${asset.value_history.length > 1 && "md:w-1/2"}`}>
                  <HistoryTable asset={asset} />
                </div>
              </div>
            </div>
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

export type Asset = {
  id: number;
  category: string;
  name: string | null;
  value_history: {
    id: number;
    value: number | null;
    updated_at: Date | null;
  }[];
};
