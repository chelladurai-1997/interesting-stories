// Helper function to get string values from FormData
export function getStringFromFormData(formData: FormData, key: string): string {
  const value = formData.get(key);
  return value === null ? "" : (value as string);
}
