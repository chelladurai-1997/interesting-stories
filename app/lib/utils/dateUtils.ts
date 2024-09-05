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
