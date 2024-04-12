"use server";

import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import * as schema from "../../../server/db/schema";
import { auth } from "@clerk/nextjs";
import { getShare } from "../addShares/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "./button";

export default async function Page({ params }: { params: { symbol: string } }) {
  const { userId } = auth();
  const { symbol }: { symbol: string } = params;

  const searchSymbol: string = symbol.replace("-", ".");
  const currentData = await getShare(searchSymbol);

  const holdings = await db
    .select()
    .from(schema.sharePurchase)
    .where(sql`symbol = ${searchSymbol} AND user_id = ${userId}`);

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      <div className="flex flex-col w-full md:w-1/2 justify-center">
        {currentData ? (
          <>
            <h1 className="flex w-full font-bold my-5 justify-center">
              {currentData.symbol} - {currentData.longName}
            </h1>
            {holdings && holdings.length ? (
              <div className="  overflow-x-scroll md:overflow-auto">
                <table className="table table-zebra table-sm">
                  <thead className="border-b border-black border-3">
                    <tr>
                      <th>Purchase Date</th>
                      <th>Purchase Price</th>
                      <th>Brokerage</th>
                      <th>Quantity</th>
                      <th>Current Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map over holdings and render table rows */}
                    {holdings.map((holding, index) => (
                      <tr key={index}>
                        {/* Render data in table cells */}
                        <td>{holding.purchase_date?.toLocaleDateString()}</td>
                        <td>${holding.purchase_price}</td>
                        <td>${holding.brokerage?.toFixed(2)}</td>
                        <td>{holding.qty}</td>
                        <td>${(currentData!.regularMarketPrice! * holding.qty!).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-black border-3">
                    <tr>
                      <td>Total</td>
                      <td></td>
                      <td>${holdings.reduce((total, purchase) => total + purchase.brokerage!, 0).toFixed(2)}</td>
                      <td>${holdings.reduce((total, purchase) => total + purchase.qty!, 0)}</td>
                      <td>
                        $
                        {holdings
                          .reduce((total, purchase) => total + currentData!.regularMarketPrice! * purchase.qty!, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="w-full justify-center text-center">
                You do not have any holdings in this company. Add a holding{" "}
                <Link className="underline" href="/shares/addShares">
                  here
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full justify-center text-center mt-4">
            This company does not exist.
            <Button />
          </div>
        )}
      </div>
    </main>
  );
}
