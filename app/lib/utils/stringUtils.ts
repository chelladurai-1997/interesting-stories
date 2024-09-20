// stringUtils.ts

export const concatenateNonEmpty = (
  ...values: (string | null | undefined)[]
): string => {
  return values.filter(Boolean).join(", "); // Filter out falsy values and join with a comma
};
