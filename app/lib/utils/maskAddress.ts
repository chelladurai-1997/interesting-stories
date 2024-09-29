// Helper function to mask addresses
export const maskAddress = (address: string) => {
  if (!address || address.length <= 5) return address;
  return `${address.substring(0, 5)}${"*".repeat(address.length - 5)}`;
};
