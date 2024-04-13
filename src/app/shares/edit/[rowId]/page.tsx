"use server";

import { db } from "@/server/db";
import { sql } from "drizzle-orm";
import * as schema from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { getQuote } from "@/server/api/yahooFinance";
import Button from "./button";
import { updateChanges } from "./action";

export default async function Page({ params }: { params: { rowId: string } }) {
  const { userId } = auth();
  const { rowId }: { rowId: string } = params;

  const holding = (
    await db
      .select()
      .from(schema.sharePurchase)
      .where(sql`row_id = ${rowId} AND user_id = ${userId}`)
  )[0];

  const currentInfo = await (holding.symbol ? getQuote(holding.symbol) : null);

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      {currentInfo ? (
        <>
          <h1 className="flex w-full font-bold my-5 justify-center">
            {currentInfo.symbol} - {currentInfo.longName}
          </h1>
          <div className="flex w-full justify-center">
            <Form />
          </div>
        </>
      ) : null}
    </main>
  );
}

const Form = () => {
  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  return (
    <form className="w-full flex justify-center mt-5">
      <input type="hidden" name="symbol" />
      <div className="flex flex-wrap w-1/2 my-5 justify-between">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
            htmlFor="purchase-date"
          >
            Purchase Date
          </label>
          <input
            className={inputClass}
            id="purchase-date"
            name="purchase-date"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
            htmlFor="purchase-price"
          >
            Purchase Price
          </label>
          <input className={inputClass} id="purchase-price" name="purchase-price" type="text" required />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2">Total</label>
          <input className={inputClass} disabled />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input className={inputClass} id="quantity" name="quantity" type="number" required />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="brokerage">
            Brokerage Fee
          </label>
          <input className={inputClass} id="brokerage" name="brokerage" type="text" required />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2 invisible"
            htmlFor="quantity"
          >
            -
          </label>
          <Button />
        </div>
      </div>
    </form>
  );
};
