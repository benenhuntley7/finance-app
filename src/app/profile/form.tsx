"use client";

import React, { useRef } from "react";
import { updateUser } from "./actions";
import Button from "./button";
import { validateCurrency } from "../functions/currency";

export default function Form({ user }: any) {
  const ref = useRef<HTMLFormElement>(null);

  const stateOptions = [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "South Australia",
    "Tasmania",
    "Victoria",
    "West Australia",
  ];

  const frequencyOptions = [
    { label: "Weekly", value: 1 },
    { label: "Fortnightly", value: 2 },
    { label: "Monthly", value: 4 },
    { label: "Annually", value: 52 },
  ];

  const inputClass =
    "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <form className="w-full max-w-md mt-5" ref={ref} action={async (formData) => updateUser(formData)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="first-name">
            First Name
          </label>
          <input
            className={inputClass}
            id="first-name"
            name="first-name"
            type="text"
            defaultValue={user?.firstName ? user.firstName : ""}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="last-name">
            Last Name
          </label>
          <input
            className={inputClass}
            id="last-name"
            name="last-name"
            type="text"
            defaultValue={user?.lastName ? user.lastName : ""}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={inputClass}
            id="email"
            name="email"
            type="text"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            defaultValue={user?.email ? user.email : ""}
            required
          />
        </div>
      </div>
      <p className="text-slate-500 text-xs italic mt-10 pb-2">Location information:</p>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="state">
            State
          </label>
          <div className="relative">
            <select className={inputClass} id="state" name="state">
              {stateOptions.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="postcode">
            Postcode
          </label>
          <input className={inputClass} id="postcode" name="postcode" type="text" />
        </div>
      </div>
      <p className="text-slate-500 text-xs italic mt-10 pb-2">Finance Information:</p>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="income">
            Income
          </label>
          <input
            className={inputClass}
            id="income"
            name="income"
            type="text" // Change type to text to handle formatting
            inputMode="numeric" // Add inputMode for numeric keyboard on mobile devices
            defaultValue={user?.income ? "$" + user.income.toLocaleString() : ""} // Include "$" symbol
            onChange={validateCurrency}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
            htmlFor="income-frequency"
          >
            Frequency
          </label>
          <div className="relative">
            <select
              className={inputClass}
              id="income-frequency"
              name="income-frequency"
              defaultValue={user?.income_frequency ? user.income_frequency : "1"}
            >
              {frequencyOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-4 mb-6">
        {/* Reset the form to the last saved data */}
        <label className="btn btn-outline bg-neutral-200 me-5 w-1/4" onClick={() => ref.current?.reset()}>
          Reset
        </label>
        <Button />
      </div>
    </form>
  );
}
