import { ChangeEvent } from "react";

// Function to validate currency input
export const validateCurrency = (e: ChangeEvent<HTMLInputElement>) => {
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
