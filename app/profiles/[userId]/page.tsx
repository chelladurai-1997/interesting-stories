"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SkeletonLoader from "@/app/components/molecules/SkeletonLoader/SkeletonLoader";
import ImageGallery from "@/app/components/organism/ImageGallery/ImageGallery";

// Define types for profile data
interface Profile {
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

// SVG Icons
const UpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 15l-7.5-7.5L4.5 15"
    />
  </svg>
);

const DownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 9l7.5 7.5L19.5 9"
    />
  </svg>
);

const Accordion: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onClick}
        className="flex justify-between w-full p-4 font-medium text-left text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500"
      >
        {title}
        {isOpen ? <UpIcon /> : <DownIcon />}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] p-4" : "max-h-0 p-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const params = useParams();
  const [openSection, setOpenSection] = useState<string>("basicInfo");
  const id = params?.userId; // This should match your dynamic route folder name, e.g., [id]

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles/" + id);
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const result = await response.json();
        setProfile(result.data);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [id]);

  if (loading) {
    return <SkeletonLoader type="card" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 p-6">
      {/* Sticky Image Gallery */}
      <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-6 lg:space-y-4">
        <ImageGallery
          images={[
            "https://media.istockphoto.com/id/1283895185/photo/hindu-indian-young-bride-holding-deepa.jpg?s=1024x1024&w=is&k=20&c=vGodoL_hhKP1Q11f7tgFSxddz7O6csnn2AGyitTQ6Yk=",
            "https://media.istockphoto.com/id/521805790/photo/close-up-of-groom-holding-brides-hand.webp?s=612x612&w=is&k=20&c=af6OmoS3qjc58B2utOQxe5NPetF35jL9PeGZA4Ukbo4=",
          ]}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
          Profile Details
        </h1>

        <Accordion
          title="Basic Information"
          isOpen={openSection === "basicInfo"}
          onClick={() =>
            setOpenSection(openSection === "basicInfo" ? "" : "basicInfo")
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Name:</strong> {profile.basicInfo.name}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profile.basicInfo.dob}
            </p>
            <p>
              <strong>Gender:</strong> {profile.basicInfo.gender}
            </p>
            <p>
              <strong>Profile Created By:</strong>{" "}
              {profile.basicInfo.profile_created_by}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {profile.basicInfo.marital_status}
            </p>
            <p>
              <strong>Children:</strong> {profile.basicInfo.children}
            </p>
            <p>
              <strong>Children Living Status:</strong>{" "}
              {profile.basicInfo.children_living_status}
            </p>
            <p>
              <strong>Profile Bio:</strong> {profile.basicInfo.profile_bio}
            </p>
          </div>
        </Accordion>

        <Accordion
          title="Contact Information"
          isOpen={openSection === "contactInfo"}
          onClick={() =>
            setOpenSection(openSection === "contactInfo" ? "" : "contactInfo")
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Mobile:</strong> {profile.contactInfo.mobile}
            </p>
            <p>
              <strong>WhatsApp:</strong> {profile.contactInfo.whatsapp}
            </p>
            <p>
              <strong>Country:</strong> {profile.contactInfo.country}
            </p>
            <p>
              <strong>State:</strong> {profile.contactInfo.state}
            </p>
            <p>
              <strong>District:</strong> {profile.contactInfo.district}
            </p>
            <p>
              <strong>Address:</strong> {profile.contactInfo.address}
            </p>
            <p>
              <strong>Pin Code:</strong> {profile.contactInfo.pin_code}
            </p>
          </div>
        </Accordion>

        <Accordion
          title="Education & Occupation"
          isOpen={openSection === "educationOccupation"}
          onClick={() =>
            setOpenSection(
              openSection === "educationOccupation" ? "" : "educationOccupation"
            )
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Education:</strong>{" "}
              {profile.educationOccupation.education}
            </p>
            <p>
              <strong>Education Info:</strong>{" "}
              {profile.educationOccupation.educationInfo}
            </p>
            <p>
              <strong>Occupation:</strong>{" "}
              {profile.educationOccupation.occupation}
            </p>
            <p>
              <strong>Occupation Info:</strong>{" "}
              {profile.educationOccupation.occupationInfo}
            </p>
            <p>
              <strong>Working Place:</strong>{" "}
              {profile.educationOccupation.workingPlace}
            </p>
            <p>
              <strong>Monthly Income:</strong>{" "}
              {profile.educationOccupation.monthlyIncome}
            </p>
          </div>
        </Accordion>

        <Accordion
          title="Expectations"
          isOpen={openSection === "expectations"}
          onClick={() =>
            setOpenSection(openSection === "expectations" ? "" : "expectations")
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Jaadhagam:</strong> {profile.expectations.jaadhagam}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {profile.expectations.marital_status}
            </p>
            <p>
              <strong>Working Place:</strong>{" "}
              {profile.expectations.working_place}
            </p>
            <p>
              <strong>Expecting Stars:</strong>{" "}
              {profile.expectations.expecting_stars}
            </p>
            <p>
              <strong>Expectation Info:</strong>{" "}
              {profile.expectations.expectation_info}
            </p>
          </div>
        </Accordion>

        <Accordion
          title="Family Details"
          isOpen={openSection === "familyDetails"}
          onClick={() =>
            setOpenSection(
              openSection === "familyDetails" ? "" : "familyDetails"
            )
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Father's Name:</strong> {profile.familyDetails.fatherName}
            </p>
            <p>
              <strong>Father Status:</strong>{" "}
              {profile.familyDetails.fatherStatus}
            </p>
            <p>
              <strong>Mother's Name:</strong> {profile.familyDetails.motherName}
            </p>
            <p>
              <strong>Mother Status:</strong>{" "}
              {profile.familyDetails.motherStatus}
            </p>
            <p>
              <strong>Father's Occupation:</strong>{" "}
              {profile.familyDetails.fatherOccupation}
            </p>
            <p>
              <strong>Mother's Occupation:</strong>{" "}
              {profile.familyDetails.motherOccupation}
            </p>
            <p>
              <strong>Mother's Kulam:</strong>{" "}
              {profile.familyDetails.motherKulam}
            </p>
            <p>
              <strong>Living Place:</strong> {profile.familyDetails.livingPlace}
            </p>
            <p>
              <strong>Native Place:</strong> {profile.familyDetails.nativePlace}
            </p>
            <p>
              <strong>Number of Brothers:</strong>{" "}
              {profile.familyDetails.noOfBrothers}
            </p>
            <p>
              <strong>Number of Brothers Married:</strong>{" "}
              {profile.familyDetails.noOfBrothersMarried}
            </p>
            <p>
              <strong>Number of Sisters:</strong>{" "}
              {profile.familyDetails.noOfSisters}
            </p>
            <p>
              <strong>Number of Sisters Married:</strong>{" "}
              {profile.familyDetails.noOfSistersMarried}
            </p>
            <p>
              <strong>Property:</strong> {profile.familyDetails.property}
            </p>
          </div>
        </Accordion>

        <Accordion
          title="Horoscope Info"
          isOpen={openSection === "horoscopeInfo"}
          onClick={() =>
            setOpenSection(
              openSection === "horoscopeInfo" ? "" : "horoscopeInfo"
            )
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Raasi:</strong> {profile.horoscopeInfo.raasi}
            </p>
            <p>
              <strong>Nachathiram:</strong> {profile.horoscopeInfo.nachathiram}
            </p>
            <p>
              <strong>Lagnam:</strong> {profile.horoscopeInfo.lagnam}
            </p>
            <p>
              <strong>Dhisai Irupu:</strong> {profile.horoscopeInfo.dhisaiIrupu}
            </p>
            <p>
              <strong>Dhosam:</strong> {profile.horoscopeInfo.dhosam}
            </p>
            <div>
              <strong>Horoscope Image:</strong>{" "}
              <Image
                src={profile.horoscopeInfo.upload}
                alt="Horoscope"
                className="w-full h-auto rounded-md object-cover"
                width={600}
                height={400}
              />
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Personal Details"
          isOpen={openSection === "personalDetails"}
          onClick={() =>
            setOpenSection(
              openSection === "personalDetails" ? "" : "personalDetails"
            )
          }
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Religion:</strong> {profile.personalDetails.religion}
            </p>
            <p>
              <strong>Caste:</strong> {profile.personalDetails.caste}
            </p>
            <p>
              <strong>Kulam:</strong> {profile.personalDetails.kulam}
            </p>
            <p>
              <strong>Kula Deivam:</strong>{" "}
              {profile.personalDetails.kula_deivam}
            </p>
            <p>
              <strong>Height:</strong> {profile.personalDetails.height}
            </p>
            <p>
              <strong>Complexion:</strong> {profile.personalDetails.complexion}
            </p>
            <p>
              <strong>Weight:</strong> {profile.personalDetails.weight}
            </p>
            <p>
              <strong>Blood Group:</strong>{" "}
              {profile.personalDetails.blood_group}
            </p>
            <p>
              <strong>Physically Challenged:</strong>{" "}
              {profile.personalDetails.physically_challenged ? "Yes" : "No"}
            </p>
            <p>
              <strong>Physical Challenge Details:</strong>{" "}
              {profile.personalDetails.physical_challenge_details}
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
