"use client";

import React, { ChangeEvent, useRef } from "react";
import { updateUser } from "./actions";
import Button from "./button";

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
    <form className="w-full max-w-lg mt-5" ref={ref} action={async (formData) => updateUser(formData)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
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
      <p className="text-gray-600 text-xs italic mt-10 pb-2">Location information:</p>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
            State
          </label>
          <div className="relative">
            <select className={inputClass} id="state" name="state">
              {stateOptions.map((state) => (
                <option value={state}>{state}</option>
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="postcode">
            Postcode
          </label>
          <input className={inputClass} id="postcode" name="postcode" type="text" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="postcode">
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
            Frequency
          </label>
          <div className="relative">
            <select className={inputClass} id="state" name="state">
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
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
        <label className="btn btn-outline bg-neutral-200 me-5 w-1/4" onClick={() => ref.current?.reset()}>
          Reset
        </label>
        <Button />
      </div>
    </form>
  );
}

// Function to validate currency input
const validateCurrency = (e: ChangeEvent<HTMLInputElement>) => {
  // Check if the input value is empty
  const inputValue = e.target.value;
  if (inputValue === "") {
    // If empty, set income value to an empty string or any default value you prefer
    e.target.value = ""; // or set to a default value, e.g., "$0"
    // Update state or perform other actions with the income value
    return; // Exit the onChange handler early
  }

  // Strip non-numeric characters (except ".") and convert to number for submission
  const income = parseFloat(inputValue.replace(/[^\d.]/g, ""));
  // Check if the parsed value is NaN (Not-a-Number)
  if (isNaN(income)) {
    // If NaN, handle this case accordingly (e.g., display an error message)
    // You can set the input value back to the previous value or any default value
    e.target.value = ""; // or set to a default value, e.g., "$0"
    // Update state or perform other actions with the income value
    return; // Exit the onChange handler early
  }
  // Format the number with commas and include the "$" symbol
  const formattedIncome = "$" + income.toLocaleString();
  // Update the input field value with the formatted income
  e.target.value = formattedIncome;
  // Update state or perform other actions with the income value
};
