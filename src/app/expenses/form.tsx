"use client";

import React, { useRef } from "react";
import { userInput } from "./actions"; //Function not implemented yet

export default function Form({ user }: any) {
  const ref = useRef<HTMLFormElement>(null);

  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  return (
    <form
      className="flex max-w-md"
      ref={ref}
      action={async (formData) => userInput(formData)}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full">
          <label
            className="block tracking-widest text-slate-500 text-xs font-semibold mb-2"
            htmlFor="income"
          >
            Estimated Weekly Income:
          </label>
          <input
            className={inputClass}
            id="weeklyIncome"
            name="weeklyIncome"
            type="text"
            placeholder="Example: $500"
          />
        </div>
        <div className="flex w-full gap-6 mt-8">
          <div className="flex flex-col">
            <label
              className="block tracking-widest text-slate-500 text-xs font-semibold mb-2"
              htmlFor="Category"
            >
              Category
            </label>
            <input
              className={inputClass}
              id="category"
              name="category"
              type="text"
              placeholder="Choose Category"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="block tracking-widest text-slate-500 text-xs font-semibold mb-2"
              htmlFor="Amount"
            >
              Amount:
            </label>
            <input
              className={inputClass}
              id="amount"
              name="amount"
              type="text"
              placeholder="Amount"
            />
          </div>
        </div>
        <div className="flex flex-col w-full items-center">
          <label
            className="block uppercase tracking-widest text-slate-500 text-xs  m-2"
            htmlFor="Amount"
          >
            Estimated Savings Amount:
          </label>
          <div className="w-1/2">
          <input
            className={inputClass}
            id="savings"
            name="savings"
            type="text"
            value="$0.00"
          />
          </div>
          
        </div>
      </div>
    </form>
  );
}
