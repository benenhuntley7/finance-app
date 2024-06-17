"use client";
import "./style.css";
import React, { useRef } from "react";
import { userInput } from "./actions"; //Function not implemented yet
import Button from "./Components/button";

const optionsCategory = [
  {
    name: "Groceries",
  },
  {
    name: "Living",
  },
  {
    name: "Subscriptions",
  },
  {
    name: "Vehicle",
  },
];

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
            inputMode="numeric"
            placeholder="Example: $500"
          />
        </div>
        <div className="flex flex-row w-full gap-6 mt-8">
          <div className="flex flex-col w-1/2">
            <label
              className="block tracking-widest text-slate-500 text-xs font-semibold mb-2"
              htmlFor="Category"
            >
              Category{" "}
              <span className="  float-right ml-auto text-slate-700 text-[18px]">
                ✚
              </span>
            </label>
            <select className={inputClass} id="categorySelect" name="category">
              {optionsCategory.map((category, index) => (
                <option
                  className="bg-slate-400"
                  key={index}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/2">
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
              inputMode="numeric"
              placeholder="$"
            />
          </div>
        </div>
        <div className="w-1/2 flex ml-auto mr-auto mb-3">
          <Button />
        </div>
        <div className="flex flex-col w-full items-center border border-slate-600 rounded-md">
          <label
            className="block uppercase underline tracking-widest text-slate-600 text-xs  m-2"
            htmlFor="Amount"
          >
            Estimated Savings Amount:
          </label>
          <div className="w-1/2 text-center text-xl">$300</div>
        </div>
      </div>
    </form>
  );
}
