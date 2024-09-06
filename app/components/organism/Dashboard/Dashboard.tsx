"use client";

import { getProfileData } from "@/app/lib/actions/getProfileData.action";
import React, { useEffect, useState } from "react";

interface SidebarItemProps {
  href: string;
  icon: string;
  text: string;
  isActive?: boolean;
  external?: boolean;
  button?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  text,
  isActive,
  external,
  button,
}) => (
  <li
    className={`hover:bg-blue-50 ${isActive ? "bg-blue-100" : ""} ${
      button ? "cursor-pointer" : ""
    }`}
  >
    {button ? (
      <button className="w-full text-left px-4 py-2 flex items-center text-gray-700">
        <i className={`fa ${icon} mr-3`} aria-hidden="true"></i>
        {text}
      </button>
    ) : (
      <a
        href={href}
        className="w-full  px-4 py-2 flex items-center text-gray-700"
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : ""}
      >
        <i className={`fa ${icon} mr-3`} aria-hidden="true"></i>
        {text}
      </a>
    )}
  </li>
);

const Dashboard: React.FC = async () => {
  const [profileData, setProfileData] = useState<any>();
  useEffect(() => {
    getProfileData().then((c: any) => setProfileData(c));
  }, []);

  const {
    basicInfo,
    contactInfo,
    educationOccupation,
    expectations,
    familyDetails,
    horoscopeInfo,
  } = profileData?.data || {
    basicInfo: {},
    contactInfo: {},
    educationOccupation: {},
    expectations: {},
    familyDetails: {},
    horoscopeInfo: {},
  };

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
export default Dashboard;
