"use server";

import { getSharePurchases, SharePurchase } from "../shares/actions";

export default async function page() {
  const sharePurchases = await getSharePurchases();

  if (sharePurchases) {
    const chartData = calculateChartData(sharePurchases);
  }

  return (
    <main className="flex flex-col items-center justify-between relative px-2 lg:px-20">
      {sharePurchases ? (
        <ShareTable sharePurchases={sharePurchases} />
      ) : (
        <div className="loading loading-spinner"></div>
      )}
    </main>
  );
}

const ShareTable = ({ sharePurchases }: { sharePurchases: SharePurchase[] }) => {
  return (
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
  );
};

function calculateChartData(data: SharePurchase[]) {}
