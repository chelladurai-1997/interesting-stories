type Sections = {
  basicInfo: boolean;
  personalDetails: boolean;
  educationOccupation: boolean;
  horoscope: boolean;
  expectation: boolean;
  familyDetails: boolean;
  contactDetails: boolean;
};

export function calculateCompletionPercentage(
  sections: Sections | undefined
): number {
  if (!sections) {
    return 0; // Handle undefined sections
  }

  const totalSections = Object.keys(sections).length;
  const completedSections = Object.values(sections).filter(
    (value) => value === true // Count only true values
  ).length;

  const percentage = (completedSections / totalSections) * 100;

  return Math.round(percentage);
}
