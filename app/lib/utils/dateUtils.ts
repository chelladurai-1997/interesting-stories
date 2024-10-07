// dateUtils.ts

/**
 * Returns the date a given number of years ago from today formatted as YYYY-MM-DD.
 * @param {number} age - The age to calculate the date for.
 * @returns {string} - The formatted date string.
 */
export function getMaxDateForAge(age: number): string {
  const today = new Date();
  const pastDate = new Date(
    today.getFullYear() - age,
    today.getMonth(),
    today.getDate()
  );
  return pastDate.toISOString().split("T")[0];
}

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "Invalid date";

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Format the date to DD/MM/YYYY
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  // Replace '/' with '-' for DD-MM-YYYY
  return formattedDate.replace(/\//g, "-");
};

export enum DateVariation {
  Sent = "Sent",
  Received = "Received",
  Updated = "Updated",
  Visited = "Visited",
}

export const formatDateForCards = (
  date: Date,
  variation: DateVariation
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date according to the specified options
  const formattedDate = date.toLocaleString("en-US", options).replace(",", "");

  // Return the formatted string with the variation
  return `${variation} on ${formattedDate}`;
};
