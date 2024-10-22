// Helper function to mask addresses
export const maskAddress = (address: string) => {
  if (!address || address.length <= 5) return address;

  let maskedAddress = "";

  // Convert address to an array of characters and use forEach to iterate
  Array.from(address).forEach((char, index) => {
    // Check if the character is a space or if the index is less than 5
    if (char === " " || index < 5) {
      maskedAddress += char; // Retain spaces and the first five characters
    } else {
      maskedAddress += "*"; // Mask other characters
    }
  });

  return maskedAddress;
};
