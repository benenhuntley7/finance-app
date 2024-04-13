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

export function formatCurrency(amount: number | null | undefined, currency = "$", locale = "en-US", decimalPlaces = 2) {
  if (amount == null) return ""; // Handle null or undefined amounts
  const roundedAmount = amount.toFixed(decimalPlaces);
  const roundedNumber = parseFloat(roundedAmount); // Convert back to number to remove trailing zeros
  const formattedNumber = roundedNumber.toLocaleString(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
  return `${currency}${formattedNumber}`;
}
