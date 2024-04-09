"use client";

import { validateCurrency } from "../functions/currency";
import { addPurchase } from "./actions";

interface FormProps {
  symbol: string;
  currentPrice: number;
  toggleModal: () => void; // Add handleClick prop
}

export default function AddShareForm({ toggleModal, symbol, currentPrice }: FormProps) {
  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <form className="w-full flex justify-center mt-5" action={async (formData) => addPurchase(formData)}>
      <input type="hidden" value={symbol} />
      <div className="flex flex-wrap w-1/2 my-5 justify-between">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
            htmlFor="purchase-date"
          >
            Purchase Date
          </label>
          <input className={inputClass} id="purchase-date" name="purchase-date" type="date" required />
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
            defaultValue={currentPrice}
            onChange={validateCurrency}
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
            defaultValue="$10"
            onChange={validateCurrency}
            required
          />
        </div>
        <div className="px-3 mb-6 md:mb-0 w-full align-top flex">
          <button className="btn btn-primary btn-outline w-1/3 md:w-1/4 me-3">Add Purchase</button>
          <label className="btn btn-outline bg-neutral-200 me-5 w-1/3 md:w-1/4" onClick={toggleModal}>
            Close
          </label>
        </div>
      </div>
    </form>
  );
}
