import Link from "next/link";
import { TableDataEntry } from "../functions";

export const ShareTable = ({ sharePurchases }: { sharePurchases: TableDataEntry[] }) => {
  return (
    <div className="flex w-3/5 mt-4">
      <table className="table table-zebra table-sm">
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
                <Link className="font-bold underline" href={`/shares/${purchase.symbol.replace(".", "-")}`}>
                  {purchase.symbol && purchase.symbol.split(".")[0].toUpperCase()}
                </Link>
              </td>
              <td>{purchase.qty}</td>
              <td>${purchase.purchase_price}</td>
              <td>${purchase.current_price}</td>
              <td>${(purchase.current_price! * purchase.qty!).toFixed(2)}</td>
              <td>${purchase.brokerage.toFixed(2)}</td>
              <td>
                $
                {(
                  purchase.current_price! * purchase.qty! +
                  purchase.brokerage! -
                  (purchase.purchase_price! * purchase.qty! - purchase.brokerage!)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-black border-3">
          <tr>
            <td>Total</td>
            <td colSpan={3}></td>
            <td>
              $
              {sharePurchases
                .reduce((total, purchase) => total + purchase.current_price! * purchase.qty! + purchase.brokerage!, 0)
                .toFixed(2)}
            </td>
            <td>${sharePurchases.reduce((total, purchase) => total + purchase.brokerage!, 0).toFixed(2)}</td>
            <td>
              $
              {sharePurchases
                .reduce(
                  (total, purchase) =>
                    total +
                    purchase.current_price! * purchase.qty! +
                    purchase.brokerage! -
                    (purchase.purchase_price! * purchase.qty! + purchase.brokerage!),
                  0
                )
                .toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
