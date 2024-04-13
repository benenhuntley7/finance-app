import Link from "next/link";
import { TableDataEntry } from "../functions";
import { formatCurrency } from "@/app/functions/currency";

export const ShareTable = ({ sharePurchases }: { sharePurchases: TableDataEntry[] }) => {
  return (
    <div className="flex w-full mt-4">
      <table className="table table-zebra table-xs">
        <thead className="border-b border-black border-3">
          <tr>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Current Value</th>
            <th>Brokerage</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {sharePurchases.map((purchase, index) => (
            <tr key={index}>
              <td>
                <Link
                  className="font-bold underline text-blue-800"
                  href={`/shares/${purchase.symbol.replace(".", "-")}`}
                >
                  {purchase.symbol && purchase.symbol.split(".")[0].toUpperCase()}
                </Link>{" "}
                {purchase.long_name}
              </td>
              <td>{purchase.qty}</td>
              <td>{formatCurrency(purchase.purchase_price)}</td>
              <td>{formatCurrency(purchase.current_price)}</td>
              <td>{formatCurrency(purchase.current_price! * purchase.qty!)}</td>
              <td>{formatCurrency(purchase.brokerage)}</td>
              <td>
                {formatCurrency(
                  purchase.current_price! * purchase.qty! +
                    purchase.brokerage! -
                    (purchase.purchase_price! * purchase.qty! - purchase.brokerage!)
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-black border-3">
          <tr>
            <td>Total</td>
            <td colSpan={3}></td>
            <td>
              {formatCurrency(
                sharePurchases.reduce(
                  (total, purchase) => total + purchase.current_price! * purchase.qty! + purchase.brokerage!,
                  0
                )
              )}
            </td>
            <td>{formatCurrency(sharePurchases.reduce((total, purchase) => total + purchase.brokerage!, 0))}</td>
            <td>
              {formatCurrency(
                sharePurchases.reduce(
                  (total, purchase) =>
                    total +
                    purchase.current_price! * purchase.qty! +
                    purchase.brokerage! -
                    (purchase.purchase_price! * purchase.qty! + purchase.brokerage!),
                  0
                )
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
