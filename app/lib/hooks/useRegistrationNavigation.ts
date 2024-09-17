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
  Dashboard = "/dashboard",
}

// Enum for profile steps
export enum ProfileSteps {
  PersonalDetails = 1,
  EducationDetails,
  FamilyDetails,
  HoroscopeDetails,
  ExpectationDetails,
  ContactDetails,
  Dashboard,
}

// Mapping of steps to routes
const stepToRouteMap: Record<ProfileSteps, string> = {
  [ProfileSteps.PersonalDetails]: ProfileRoutes.PersonalDetails,
  [ProfileSteps.EducationDetails]: ProfileRoutes.EducationDetails,
  [ProfileSteps.FamilyDetails]: ProfileRoutes.FamilyDetails,
  [ProfileSteps.HoroscopeDetails]: ProfileRoutes.HoroscopeDetails,
  [ProfileSteps.ExpectationDetails]: ProfileRoutes.ExpectationDetails,
  [ProfileSteps.ContactDetails]: ProfileRoutes.ContactDetails,
  [ProfileSteps.Dashboard]: ProfileRoutes.Dashboard,
};

// Custom hook for registration navigation
export const useRegistrationNavigation = () => {
  const router = useRouter();

  const navigateToStep = (step: ProfileSteps) => {
    const route = stepToRouteMap[step] || ProfileRoutes.BasicDetails;
    router.push(route);
  };

  return {
    navigateToStep,
  };
};
