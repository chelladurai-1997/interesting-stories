export function calculatePercentageCompleted(
  actual: number,
  steps: number
): string {
  if (steps === 0) {
    return "0"; // Avoid division by zero, return as a string
  }

  const percentage = (actual / steps) * 100;

  return Math.round(percentage).toString(); // Return percentage as a string with two decimal points
}
