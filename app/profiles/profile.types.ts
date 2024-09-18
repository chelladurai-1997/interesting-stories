// Define types for profile data
export interface Profile {
  basicInfo: {
    name: string;
    dob: string;
    gender: string;
    profile_created_by: string;
    marital_status: string;
    children: string;
    children_living_status: string;
    profile_bio: string;
    createdAt: string;
    updatedAt: string;
  };
  contactInfo: {
    mobile: string;
    whatsapp: string;
    country: string;
    state: string;
    district: string;
    address: string;
    photo: string;
    pin_code: number;
    createdAt: string;
    updatedAt: string;
  };
  educationOccupation: {
    education: string;
    educationInfo: string;
    occupation: string;
    occupationInfo: string;
    workingPlace: string;
    monthlyIncome: string;
    createdAt: string;
    updatedAt: string;
  };
  expectations: {
    jaadhagam: string;
    marital_status: string;
    working_place: string;
    expecting_stars: string;
    expectation_info: string;
    createdAt: string;
    updatedAt: string;
  };
  familyDetails: {
    fatherName: string;
    fatherStatus: string;
    motherName: string;
    motherStatus: string;
    fatherOccupation: string;
    motherOccupation: string;
    motherKulam: string;
    livingPlace: string;
    nativePlace: string;
    noOfBrothers: number;
    noOfBrothersMarried: number;
    noOfSisters: number;
    noOfSistersMarried: number;
    property: string;
    propertyInfo: string | null;
    createdAt: string;
    updatedAt: string;
  };
  horoscopeInfo: {
    raasi: string;
    nachathiram: string;
    lagnam: string;
    dhisaiIrupu: string;
    dhosam: string;
    upload: string;
    createdAt: string;
    updatedAt: string;
  };
  personalDetails: {
    religion: string;
    caste: string;
    kulam: string;
    kula_deivam: string;
    height: string;
    complexion: string;
    weight: string;
    blood_group: string;
    physically_challenged: boolean;
    physical_challenge_details: string;
    createdAt: string;
    updatedAt: string;
  };
}
