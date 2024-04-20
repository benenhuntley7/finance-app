"use server";

import Button from "./button";
import { getAsset } from "../actions";
import { capitaliseWords } from "../functions";
import { formatCurrency } from "@/app/functions/currency";
import Link from "next/link";
import Image from "next/image";
import Form from "../form";

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
            <Form asset={asset} />
            <div className="flex w-full justify-between">
              <div className="flex w-1/2">
                <HistoryTable asset={asset} />
              </div>
              <div className="flex w-1/2 justify-center items-center">
                <span>graph goes here</span>
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

const HistoryTable = ({ asset }: { asset: Asset }) => {
  return (
    <table className="table table-zebra table-sm md:table-md">
      <thead>
        <tr>
          <th>Date</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {asset.value_history.map((entry, index) => (
          <tr key={index}>
            <td>{entry.updated_at?.toDateString()}</td>
            <td>{formatCurrency(entry.value)}</td>
            <td className="flex justify-end text-right min-w-20">
              <div className="flex gap-3">
                <Link href={`#`}>
                  <Image alt="edit" width="20" height="20" src="/icons/edit.png" />
                </Link>
                <Link href={`#`}>
                  <Image alt="delete" width="20" height="20" src="/icons/recycle-bin.png" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export type Asset = {
  id: number;
  category: string;
  name: string | null;
  value_history: {
    value: number | null;
    updated_at: Date | null; // Assuming this is a string representing a timestamp
  }[];
};
