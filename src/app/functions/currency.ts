import { ChangeEvent } from "react";

// Function to validate currency input
export const validateCurrency = (value: string) => {
  // Get the input value
  let inputValue = value.trim(); // Trim leading and trailing spaces

  // Regular expression to match valid decimal numbers
  const regex = /^\d*\.?\d*$/;

  // Check if the input matches the regular expression
  if (regex.test(inputValue)) {
    // If the input is a valid decimal number, set the input field value
    return inputValue;
  } else {
    // If input is not a valid decimal number, set the input field value to an empty string
    return "";
  }
};
