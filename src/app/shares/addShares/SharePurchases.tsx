"use client";

import { useEffect, useState } from "react";
import { getSharePurchases, SharePurchase } from "./actions";

export default function SharePurchases() {
  const [sharePurchases, setSharePurchases] = useState<SharePurchase[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSharePurchases = async () => {
      setLoading(true);
      const result = await getSharePurchases();
      setSharePurchases(result);
      setLoading(false);
    };
    fetchSharePurchases();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex w-full justify-center">
          <div className="flex justify-center loading loading-spinner"></div>
        </div>
      ) : (
        <>
          {sharePurchases && sharePurchases.length > 0 && (
            <div className="flex w-full">
              <table className="table table-zebra">
                <thead>
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
                      <td>{purchase.symbol && purchase.symbol.split(".")[0].toUpperCase()}</td>
                      <td>{purchase.qty}</td>
                      <td>${purchase.purchase_price}</td>
                      <td>${purchase.current_price}</td>
                      <td>${(purchase.current_price! * purchase.qty! + purchase.brokerage!).toFixed(2)}</td>
                      <td>${purchase.brokerage}</td>
                      <td>
                        $
                        {(
                          purchase.current_price! * purchase.qty! +
                          purchase.brokerage! -
                          (purchase.purchase_price! * purchase.qty! + purchase.brokerage!)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
}
