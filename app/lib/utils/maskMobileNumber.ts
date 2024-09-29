// Helper function to mask phone numbers
export const maskNumber = (number: string) => {
  if (!number || number.length <= 2) return number;
  return `${number[0]}${"*".repeat(number.length - 2)}${
    number[number.length - 1]
  }`;
};
