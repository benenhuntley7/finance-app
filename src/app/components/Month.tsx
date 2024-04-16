export default function Month() {
  // Get current date
  let currentDate = new Date();

  // Format the date to YYYY-MM format
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month since getMonth() returns 0-indexed
  let defaultMonth = `${year}-${month}`;

  return <input type="month" defaultValue={defaultMonth} />;
}
