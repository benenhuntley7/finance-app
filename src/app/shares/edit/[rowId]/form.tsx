"use client";

import { useState } from "react";
import Button from "./button";
import { validateCurrency } from "@/app/functions/currency";
import { updateChanges } from "./action";

interface FormProps {
  symbol: string | null;
  row_id: number;
  user_id: string | null;
  purchase_date: Date | null;
  purchase_price: number | null;
  brokerage: number | null;
  qty: number | null;
}

export const Form = ({ holding }: { holding: FormProps }) => {
  const [quantity, setQuantity] = useState(holding.qty);
  const [purchasePrice, setPurchasePrice] = useState(holding.purchase_price?.toString());
  const [brokerage, setBrokerage] = useState(holding.brokerage?.toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setQuantity(isNaN(value) ? 0 : value);
  };

  const handlePurchasePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateCurrency(event.target.value);
    setPurchasePrice(value);
  };

  const handleBrokerageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateCurrency(event.target.value);
    setBrokerage(value);
  };

  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <form
      className="w-full flex justify-center mt-5"
      action={async (formData) => {
        updateChanges(formData);
      }}
    >
      <input type="hidden" name="row_id" value={holding.row_id} />
      <div className="flex flex-wrap w-full my-5 justify-between">
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
            defaultValue={holding.purchase_date ? holding.purchase_date.toISOString().split("T")[0] : ""}
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
          <input
            className={inputClass}
            id="purchase-price"
            name="purchase-price"
            type="text"
            value={purchasePrice}
            onChange={handlePurchasePriceChange}
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2">Total</label>
          <input
            className={inputClass}
            value={(parseFloat(purchasePrice!) * quantity! + parseFloat(brokerage!)).toFixed(2)}
            disabled
          />
        </div>{" "}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            className={inputClass}
            id="quantity"
            name="quantity"
            type="number"
            value={quantity!}
            onChange={handleQuantityChange}
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="brokerage">
            Brokerage Fee
          </label>
          <input
            className={inputClass}
            id="brokerage"
            name="brokerage"
            type="text"
            value={brokerage}
            onChange={handleBrokerageChange}
            required
          />
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
