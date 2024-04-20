"use client";

import { useState } from "react";
import { validateCurrency } from "../../functions/currency";
import { addPurchase } from "../actions";
import Button from "./button";

interface FormProps {
  symbol: string;
  currentPrice: number;
}

export default function AddShareForm({ symbol, currentPrice }: FormProps) {
  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  const [quantity, setQuantity] = useState(1);
  const [purchasePrice, setPurchasePrice] = useState(currentPrice.toString());
  const [brokerage, setBrokerage] = useState("10");
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

  return (
    <>
      {isLoading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        <form
          className="w-full flex justify-center mt-5"
          action={async (formData) => {
            setIsLoading(true);
            addPurchase(formData);
          }}
        >
          <input type="hidden" name="symbol" value={symbol} />
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
                value={(parseFloat(purchasePrice) * quantity + parseFloat(brokerage)).toFixed(2)}
                disabled
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                className={inputClass}
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
                htmlFor="brokerage"
              >
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
      )}
    </>
  );
}
