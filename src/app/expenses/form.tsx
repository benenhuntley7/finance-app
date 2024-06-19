"use client";
import "./style.css";
import React, { useRef } from "react";
import { userInput, addCategory } from "./actions"; //Function not implemented yet
import { Expenses } from "./types";
import Button from "./Components/button";
import { CategorySelect } from "./Components/categorySelect";

export default function Form({ expense }: { expense?: Expenses }) {
  const ref = useRef<HTMLFormElement>(null);

  // const expense_name = expense?.name ? expense.name : "";
  // const expense_value = expense?.value ? expense.value : "";
  // const expense_category = expense?.expenseCategory?.name || undefined;

  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
    
  return (
    <form
      className="flex max-w-md"
      ref={ref}
      action={
        async (formData) => userInput(formData)}
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
        <div className="flex flex-col w-full  mt-8">
          <div className="flex flex-col">
            <label
              className="block tracking-widest text-slate-500 text-xs font-semibold mb-2"
              htmlFor="Category"
            >
              Category{" "}
              <span className="float-right text-slate-700 text-[18px]">✚</span>
            </label>
            <CategorySelect inputClass={inputClass} />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="block tracking-widest text-slate-500 text-xs font-semibold mb-2"
              htmlFor="expense_name"
            >
              Entry:
            </label>
            <input
              className={inputClass}
              id="expense_name"
              name="expense_name"
              type="text"
              placeholder="Example: Fuel Cost"
            />
          </div>
          <div className="flex flex-col ml-auto w-1/2 lg:w-1/4 md:w-1/3">
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
        <div className="w-1/2 flex ml-auto mb-3 lg:w-1/4 md:w-1/3">
          <Button update={expense ? true : false} />
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
