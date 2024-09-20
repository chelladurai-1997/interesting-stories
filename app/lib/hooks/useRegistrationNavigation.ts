import { useRouter } from "next/navigation";

// Enum for profile routes
export enum ProfileRoutes {
  BasicDetails = "/profile-info/basic-details",
  PersonalDetails = "/profile-info/personal-details",
  EducationDetails = "/profile-info/education-details",
  FamilyDetails = "/profile-info/family-details",
  HoroscopeDetails = "/profile-info/horoscope-details",
  ExpectationDetails = "/profile-info/expectation-details",
  ContactDetails = "/profile-info/contact-details",
  Dashboard = "/",
}

// Enum for profile steps
export enum ProfileSteps {
  BasicDetails = 1,
  PersonalDetails,
  EducationDetails,
  FamilyDetails,
  HoroscopeDetails,
  ExpectationDetails,
  ContactDetails,
  Dashboard,
}

// Mapping of steps to routes
const stepToRouteMap: Record<ProfileSteps, string> = {
  [ProfileSteps.BasicDetails]: ProfileRoutes.BasicDetails,
  [ProfileSteps.PersonalDetails]: ProfileRoutes.PersonalDetails,
  [ProfileSteps.EducationDetails]: ProfileRoutes.EducationDetails,
  [ProfileSteps.FamilyDetails]: ProfileRoutes.FamilyDetails,
  [ProfileSteps.HoroscopeDetails]: ProfileRoutes.HoroscopeDetails,
  [ProfileSteps.ExpectationDetails]: ProfileRoutes.ExpectationDetails,
  [ProfileSteps.ContactDetails]: ProfileRoutes.ContactDetails,
  [ProfileSteps.Dashboard]: ProfileRoutes.Dashboard,
};

// Mapping of completedSection keys to ProfileSteps
const sectionToStepMap: Record<string, ProfileSteps> = {
  basicInfo: ProfileSteps.BasicDetails,
  personalDetails: ProfileSteps.PersonalDetails,
  educationOccupation: ProfileSteps.EducationDetails,
  familyDetails: ProfileSteps.FamilyDetails,
  horoscope: ProfileSteps.HoroscopeDetails,
  expectation: ProfileSteps.ExpectationDetails,
  contactDetails: ProfileSteps.ContactDetails,
};

export const useRegistrationNavigation = () => {
  const router = useRouter();

  // Function to determine the next incomplete step
  const getNextIncompleteStep = (
    completedSections: Record<string, boolean>
  ) => {
    const sectionKeys = Object.keys(sectionToStepMap);

    // Iterate through the steps in the order they should be completed
    for (const key of sectionKeys) {
      if (!completedSections[key]) {
        // Return the first incomplete step
        return sectionToStepMap[key];
      }
    }

    // If all steps are completed, navigate to the dashboard or some other route
    return ProfileSteps.Dashboard;
  };

  const navigateToNextStep = (completedSections: Record<string, boolean>) => {
    const nextStep = getNextIncompleteStep(completedSections);
    console.log("nextStep", nextStep);
    const route = stepToRouteMap[nextStep] || ProfileRoutes.BasicDetails;
    router.push(route);
  };

  return {
    navigateToNextStep,
  };
};
