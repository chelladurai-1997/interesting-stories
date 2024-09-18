"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SkeletonLoader from "@/app/components/molecules/SkeletonLoader/SkeletonLoader";
import ImageGallery from "@/app/components/organism/ImageGallery/ImageGallery";
import { Accordion } from "@/app/components/molecules/Accordion/Accordion";

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
      <div className="lg:w-1/4 lg:sticky lg:top-6 lg:space-y-4 mb-4 lg:mb-0">
        <ImageGallery
          images={[profile.contactInfo.photo, profile.horoscopeInfo.upload]}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto  p-4 bg-white shadow-lg rounded-lg">
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Name:</strong> {profile.basicInfo.name}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>Date of Birth:</strong> {profile.basicInfo.dob}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Gender:</strong> {profile.basicInfo.gender}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>Profile Created By:</strong>{" "}
              {profile.basicInfo.profile_created_by}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
              <strong>Marital Status:</strong>{" "}
              {profile.basicInfo.marital_status}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-pink-200 text-pink-800">
              <strong>Children:</strong> {profile.basicInfo.children}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-teal-200 text-teal-800">
              <strong>Children Living Status:</strong>{" "}
              {profile.basicInfo.children_living_status}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-800">
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Mobile:</strong> {profile.contactInfo.mobile}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>WhatsApp:</strong> {profile.contactInfo.whatsapp}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Country:</strong> {profile.contactInfo.country}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>State:</strong> {profile.contactInfo.state}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
              <strong>District:</strong> {profile.contactInfo.district}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-pink-200 text-pink-800">
              <strong>Address:</strong> {profile.contactInfo.address}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-teal-200 text-teal-800">
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Education:</strong>{" "}
              {profile.educationOccupation.education}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>Education Info:</strong>{" "}
              {profile.educationOccupation.educationInfo}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Occupation:</strong>{" "}
              {profile.educationOccupation.occupation}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>Occupation Info:</strong>{" "}
              {profile.educationOccupation.occupationInfo}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
              <strong>Working Place:</strong>{" "}
              {profile.educationOccupation.workingPlace}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-pink-200 text-pink-800">
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Jaadhagam:</strong> {profile.expectations.jaadhagam}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>Marital Status:</strong>{" "}
              {profile.expectations.marital_status}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Working Place:</strong>{" "}
              {profile.expectations.working_place}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>Expecting Stars:</strong>{" "}
              {profile.expectations.expecting_stars}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Father's Name:</strong> {profile.familyDetails.fatherName}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>Father Status:</strong>{" "}
              {profile.familyDetails.fatherStatus}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Mother's Name:</strong> {profile.familyDetails.motherName}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>Mother Status:</strong>{" "}
              {profile.familyDetails.motherStatus}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
              <strong>Father's Occupation:</strong>{" "}
              {profile.familyDetails.fatherOccupation}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-pink-200 text-pink-800">
              <strong>Mother's Occupation:</strong>{" "}
              {profile.familyDetails.motherOccupation}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-teal-200 text-teal-800">
              <strong>Mother's Kulam:</strong>{" "}
              {profile.familyDetails.motherKulam}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-800">
              <strong>Living Place:</strong> {profile.familyDetails.livingPlace}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-red-200 text-red-800">
              <strong>Native Place:</strong> {profile.familyDetails.nativePlace}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-orange-200 text-orange-800">
              <strong>Number of Brothers:</strong>{" "}
              {profile.familyDetails.noOfBrothers}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-lime-200 text-lime-800">
              <strong>Number of Brothers Married:</strong>{" "}
              {profile.familyDetails.noOfBrothersMarried}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-cyan-200 text-cyan-800">
              <strong>Number of Sisters:</strong>{" "}
              {profile.familyDetails.noOfSisters}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-emerald-200 text-emerald-800">
              <strong>Number of Sisters Married:</strong>{" "}
              {profile.familyDetails.noOfSistersMarried}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-violet-200 text-violet-800">
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Raasi:</strong> {profile.horoscopeInfo.raasi}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>Nachathiram:</strong> {profile.horoscopeInfo.nachathiram}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Lagnam:</strong> {profile.horoscopeInfo.lagnam}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>Dhisai Irupu:</strong> {profile.horoscopeInfo.dhisaiIrupu}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
              <strong>Dhosam:</strong> {profile.horoscopeInfo.dhosam}
            </p>
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
            <p className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800">
              <strong>Religion:</strong> {profile.personalDetails.religion}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800">
              <strong>Caste:</strong> {profile.personalDetails.caste}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <strong>Kulam:</strong> {profile.personalDetails.kulam}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-800">
              <strong>Kula Deivam:</strong>{" "}
              {profile.personalDetails.kula_deivam}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800">
              <strong>Height:</strong> {profile.personalDetails.height}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-pink-200 text-pink-800">
              <strong>Complexion:</strong> {profile.personalDetails.complexion}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-teal-200 text-teal-800">
              <strong>Weight:</strong> {profile.personalDetails.weight}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-800">
              <strong>Blood Group:</strong>{" "}
              {profile.personalDetails.blood_group}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-red-200 text-red-800">
              <strong>Physically Challenged:</strong>{" "}
              {profile.personalDetails.physically_challenged ? "Yes" : "No"}
            </p>
            <p className="inline-block px-3 py-1 rounded-full bg-orange-200 text-orange-800">
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
