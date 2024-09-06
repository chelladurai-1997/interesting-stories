import React from "react";

// Define TypeScript interfaces for the data
interface BasicInfo {
  name: string;
  userId: string;
  gender: string;
  dob: string;
  profile_created_by: string;
  marital_status: string;
  children: string;
  children_living_status: string;
  profile_bio: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface ContactInfo {
  userId: string;
  mobile: string;
  sameAsMobile: boolean;
  whatsapp: string;
  country: string;
  state: string;
  district: string;
  address: string;
  photo: string;
  pin_code: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface EducationOccupation {
  userId: string;
  education: string;
  educationInfo: string;
  occupation: string;
  occupationInfo: string;
  workingPlace: string;
  monthlyIncome: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Expectations {
  userId: string;
  jaadhagam: string;
  marital_status: string;
  working_place: string;
  expecting_stars: string;
  expectation_info: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface FamilyDetails {
  userId: string;
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
  id: string;
}

interface HoroscopeInfo {
  userId: string;
  raasi: string;
  nachathiram: string;
  lagnam: string;
  dhisaiIrupu: string;
  dhosam: string;
  upload: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Define the prop type for the ProfileDetail component
interface ProfileDetailProps {
  data: {
    basicInfo: BasicInfo;
    contactInfo: ContactInfo;
    educationOccupation: EducationOccupation;
    expectations: Expectations;
    familyDetails: FamilyDetails;
    horoscopeInfo: HoroscopeInfo;
  };
}

const ProfileDetail: React.FC<ProfileDetailProps | undefined> = ({
  data,
}: any) => {
  const {
    basicInfo,
    contactInfo,
    educationOccupation,
    expectations,
    familyDetails,
    horoscopeInfo,
  } = data;

  return (
    <div className="container mx-auto p-6">
      {/* Basic Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Name:</strong> {basicInfo.name}
            </p>
            <p className="text-lg">
              <strong>User ID:</strong> {basicInfo.userId}
            </p>
            <p className="text-lg">
              <strong>Gender:</strong> {basicInfo.gender}
            </p>
            <p className="text-lg">
              <strong>Date of Birth:</strong>{" "}
              {new Date(basicInfo.dob).toLocaleDateString()}
            </p>
            <p className="text-lg">
              <strong>Profile Created By:</strong>{" "}
              {basicInfo.profile_created_by}
            </p>
            <p className="text-lg">
              <strong>Marital Status:</strong> {basicInfo.marital_status}
            </p>
            <p className="text-lg">
              <strong>Children:</strong> {basicInfo.children}
            </p>
            <p className="text-lg">
              <strong>Children Living Status:</strong>{" "}
              {basicInfo.children_living_status}
            </p>
            <p className="text-lg">
              <strong>Profile Bio:</strong> {basicInfo.profile_bio}
            </p>
          </div>
          <div>
            <img
              src={contactInfo.photo}
              alt="Profile Image"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Mobile:</strong> {contactInfo.mobile}
            </p>
            <p className="text-lg">
              <strong>WhatsApp:</strong> {contactInfo.whatsapp}
            </p>
            <p className="text-lg">
              <strong>Country:</strong> {contactInfo.country}
            </p>
            <p className="text-lg">
              <strong>State:</strong> {contactInfo.state}
            </p>
            <p className="text-lg">
              <strong>District:</strong> {contactInfo.district}
            </p>
            <p className="text-lg">
              <strong>Address:</strong> {contactInfo.address}
            </p>
            <p className="text-lg">
              <strong>Pin Code:</strong> {contactInfo.pin_code}
            </p>
          </div>
          <div>
            <img
              src={contactInfo.photo}
              alt="Contact Image"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Education & Occupation */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Education & Occupation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Education:</strong> {educationOccupation.education}
            </p>
            <p className="text-lg">
              <strong>Education Info:</strong>{" "}
              {educationOccupation.educationInfo}
            </p>
            <p className="text-lg">
              <strong>Occupation:</strong> {educationOccupation.occupation}
            </p>
            <p className="text-lg">
              <strong>Occupation Info:</strong>{" "}
              {educationOccupation.occupationInfo}
            </p>
            <p className="text-lg">
              <strong>Working Place:</strong> {educationOccupation.workingPlace}
            </p>
            <p className="text-lg">
              <strong>Monthly Income:</strong>{" "}
              {educationOccupation.monthlyIncome}
            </p>
          </div>
        </div>
      </div>

      {/* Expectations */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Expectations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Jaadhagam:</strong> {expectations.jaadhagam}
            </p>
            <p className="text-lg">
              <strong>Marital Status:</strong> {expectations.marital_status}
            </p>
            <p className="text-lg">
              <strong>Working Place:</strong> {expectations.working_place}
            </p>
            <p className="text-lg">
              <strong>Expecting Stars:</strong> {expectations.expecting_stars}
            </p>
            <p className="text-lg">
              <strong>Expectation Info:</strong> {expectations.expectation_info}
            </p>
          </div>
        </div>
      </div>

      {/* Family Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Family Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Father's Name:</strong> {familyDetails.fatherName}
            </p>
            <p className="text-lg">
              <strong>Father's Status:</strong> {familyDetails.fatherStatus}
            </p>
            <p className="text-lg">
              <strong>Mother's Name:</strong> {familyDetails.motherName}
            </p>
            <p className="text-lg">
              <strong>Mother's Status:</strong> {familyDetails.motherStatus}
            </p>
            <p className="text-lg">
              <strong>Father's Occupation:</strong>{" "}
              {familyDetails.fatherOccupation}
            </p>
            <p className="text-lg">
              <strong>Mother's Occupation:</strong>{" "}
              {familyDetails.motherOccupation}
            </p>
            <p className="text-lg">
              <strong>Mother's Kulam:</strong> {familyDetails.motherKulam}
            </p>
            <p className="text-lg">
              <strong>Living Place:</strong> {familyDetails.livingPlace}
            </p>
            <p className="text-lg">
              <strong>Native Place:</strong> {familyDetails.nativePlace}
            </p>
            <p className="text-lg">
              <strong>No. of Brothers:</strong> {familyDetails.noOfBrothers}
            </p>
            <p className="text-lg">
              <strong>No. of Brothers Married:</strong>{" "}
              {familyDetails.noOfBrothersMarried}
            </p>
            <p className="text-lg">
              <strong>No. of Sisters:</strong> {familyDetails.noOfSisters}
            </p>
            <p className="text-lg">
              <strong>No. of Sisters Married:</strong>{" "}
              {familyDetails.noOfSistersMarried}
            </p>
            <p className="text-lg">
              <strong>Property:</strong> {familyDetails.property}
            </p>
            <p className="text-lg">
              <strong>Property Info:</strong>{" "}
              {familyDetails.propertyInfo || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Horoscope Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Horoscope Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Raasi:</strong> {horoscopeInfo.raasi}
            </p>
            <p className="text-lg">
              <strong>Nachathiram:</strong> {horoscopeInfo.nachathiram}
            </p>
            <p className="text-lg">
              <strong>Lagnam:</strong> {horoscopeInfo.lagnam}
            </p>
            <p className="text-lg">
              <strong>Dhisai Irupu:</strong> {horoscopeInfo.dhisaiIrupu}
            </p>
            <p className="text-lg">
              <strong>Dhosam:</strong> {horoscopeInfo.dhosam}
            </p>
            <p className="text-lg">
              <strong>Upload:</strong> {horoscopeInfo.upload}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
