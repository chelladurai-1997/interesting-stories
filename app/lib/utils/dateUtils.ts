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
// Function to format chat sent timestamp from an ISO string
export function formatChatTimestamp(isoString: string): string {
  const timestamp = new Date(isoString); // Parse the ISO string to a Date object
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000
  );

  let formattedTime: string;

  if (diffInSeconds < 60) {
    formattedTime = "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    formattedTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    formattedTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    // For older timestamps, format as 'MMM D, YYYY'
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    formattedTime = timestamp.toLocaleDateString(undefined, options);
  }

  return formattedTime;
}

export enum DateVariation {
  Sent = "Sent",
  Received = "Received",
  Updated = "Updated",
  Visited = "Last visited", // Updated to make it more readable
}

export const formatDateForCards = (
  date: Date,
  variation: DateVariation
): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  let timeAgo: string;

  if (diffInSeconds < 60) {
    timeAgo =
      diffInSeconds <= 1 ? "a second ago" : `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    timeAgo =
      diffInMinutes === 1 ? "a minute ago" : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    timeAgo = diffInHours === 1 ? "an hour ago" : `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    timeAgo = diffInDays === 1 ? "a day ago" : `${diffInDays} days ago`;
  } else if (diffInWeeks < 5) {
    timeAgo = diffInWeeks === 1 ? "a week ago" : `${diffInWeeks} weeks ago`;
  } else {
    // Fallback for dates more than 1 month ago - format the date
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    timeAgo = date.toLocaleString("en-US", options).replace(",", "");
  }

  return `${variation} ${timeAgo}`;
};
