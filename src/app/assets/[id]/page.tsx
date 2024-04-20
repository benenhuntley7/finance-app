"use server";

import Button from "./button";
import { getAsset } from "../actions";
import { capitaliseWords } from "../functions";
import { formatCurrency } from "@/app/functions/currency";

export default async function Page({ params }: { params: { id: string } }) {
  const { id }: { id: string } = params;

  const asset = await getAsset(id);
  asset?.value_history.reverse();

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      <div className="flex flex-col w-full md:w-2/3 justify-center">
        {asset ? (
          <>
            <h1 className="flex w-full font-bold my-5 justify-center">
              {capitaliseWords(asset.name)} - {formatCurrency(asset.value_history[0].value)}
            </h1>
            <HistoryTable asset={asset} />
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

const HistoryTable = ({ asset }: { asset: Asset }) => {
  return (
    <table className="table table-zebra table-sm md:table-md">
      <thead>
        <tr>
          <td>Date</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        {asset.value_history.map((entry, index) => (
          <tr key={index}>
            <td>{entry.updated_at?.toDateString()}</td>
            <td>{formatCurrency(entry.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type Asset = {
  id: number;
  category: string;
  name: string | null;
  value_history: {
    value: number | null;
    updated_at: Date | null; // Assuming this is a string representing a timestamp
  }[];
};
