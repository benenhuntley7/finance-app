"use server";

import { db } from "@/server/db";
import { sql } from "drizzle-orm";
import * as schema from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { getQuote } from "@/server/api/yahooFinance";
import { Form } from "./form";
import { formatCurrency } from "@/app/functions/currency";

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
      {currentInfo && holding ? (
        <>
          <h1 className="flex w-full font-bold my-5 justify-center">
            {currentInfo.symbol} - {currentInfo.longName}
          </h1>
          <div className="flex flex-col w-2/3 justify-center">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <td>Purchase Date</td>
                  <td>Purchase Price</td>
                  <td>Purchase Quantity</td>
                  <td>Brokerage</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{holding.purchase_date?.toLocaleDateString()}</td>
                  <td>${holding.purchase_price}</td>
                  <td>{holding.qty}</td>
                  <td>{formatCurrency(holding.brokerage)}</td>
                  <td>{formatCurrency(holding.qty! * holding.purchase_price! + holding.brokerage!)}</td>
                </tr>
              </tbody>
            </table>
            <Form holding={holding} />
          </div>
        </>
      ) : null}
    </main>
  );
}
