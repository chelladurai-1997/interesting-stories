"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterStars, setFilterStars] = useState<string>("");
  const [filterLivingPlace, setFilterLivingPlace] = useState<string>("");
  const [filterNativePlace, setFilterNativePlace] = useState<string>("");

  // States for holding the dropdown values
  const [stars, setStars] = useState<string[]>([]);
  const [livingPlaces, setLivingPlaces] = useState<string[]>([]);
  const [nativePlaces, setNativePlaces] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/fetchProfiles?gender=female");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();
        setProfiles(data);
        setFilteredProfiles(data); // Initialize filtered profiles with all profiles

        // Extract unique values for filters
        const uniqueStars: string[] = [];
        const uniqueLivingPlaces: string[] = [];
        const uniqueNativePlaces: string[] = [];

        data.forEach((profile: any) => {
          // Extract unique stars
          profile.expectation_information?.expecting_stars?.forEach(
            (star: any) => {
              if (star.value && !uniqueStars.includes(star.value)) {
                uniqueStars.push(star.value);
              }
            }
          );

          // Extract unique living place
          if (
            profile.family_information?.family_living_place &&
            !uniqueLivingPlaces.includes(
              profile.family_information.family_living_place
            )
          ) {
            uniqueLivingPlaces.push(
              profile.family_information.family_living_place
            );
          }

          // Extract unique native place
          if (
            profile.family_information?.family_native_place &&
            !uniqueNativePlaces.includes(
              profile.family_information.family_native_place
            )
          ) {
            uniqueNativePlaces.push(
              profile.family_information.family_native_place
            );
          }
        });

        // Set the unique values to the respective states
        setStars(uniqueStars);
        setLivingPlaces(uniqueLivingPlaces);
        setNativePlaces(uniqueNativePlaces);
      } catch (err) {
        setError("An error occurred while fetching profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Handle filter change for each dropdown
  const handleFilterChange = () => {
    const filtered = profiles.filter((profile) => {
      const matchesStars =
        filterStars === "" ||
        profile.expectation_information?.expecting_stars?.some((star: any) =>
          star.value.toLowerCase().includes(filterStars.toLowerCase())
        );
      const matchesLivingPlace =
        filterLivingPlace === "" ||
        profile.family_information?.family_living_place
          .toLowerCase()
          .includes(filterLivingPlace.toLowerCase());
      const matchesNativePlace =
        filterNativePlace === "" ||
        profile.family_information?.family_native_place
          .toLowerCase()
          .includes(filterNativePlace.toLowerCase());

      return matchesStars && matchesLivingPlace && matchesNativePlace;
    });

    setFilteredProfiles(filtered);
  };

  useEffect(() => {
    // Re-filter profiles when any filter changes
    handleFilterChange();
  }, [filterStars, filterLivingPlace, filterNativePlace]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }

  const handleToggleDetails = (index: number) => {
    setFilteredProfiles((prevProfiles) =>
      prevProfiles.map((profile, i) =>
        i === index ? { ...profile, showMore: !profile.showMore } : profile
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Profile List ({filteredProfiles.length})
      </h2>

      {/* Dropdown Filters for Expecting Stars, Living Place, Native Place */}
      <div className="mb-4 space-x-4 flex flex-wrap justify-center gap-4">
        {/* Filter by Expecting Stars */}
        <select
          value={filterStars}
          onChange={(e) => setFilterStars(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          <option value="">Filter by Expecting Stars</option>
          {stars.map((star, index) => (
            <option key={index} value={star}>
              {star}
            </option>
          ))}
        </select>

        {/* Filter by Living Place */}
        <select
          value={filterLivingPlace}
          onChange={(e) => setFilterLivingPlace(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          <option value="">Filter by Living Place</option>
          {livingPlaces.map((place, index) => (
            <option key={index} value={place}>
              {place}
            </option>
          ))}
        </select>

        {/* Filter by Native Place */}
        <select
          value={filterNativePlace}
          onChange={(e) => setFilterNativePlace(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          <option value="">Filter by Native Place</option>
          {nativePlaces.map((place, index) => (
            <option key={index} value={place}>
              {place}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col sm:flex-row"
            >
              {/* Profile Image */}
              <div className="relative w-full h-64 sm:w-1/3">
                <Image
                  src={
                    profile.contact_information.photo || "/default-avatar.jpg"
                  }
                  alt={profile?.basic_information?.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-t-lg sm:rounded-l-lg"
                />
              </div>

              {/* Profile Info */}
              <div className="p-6 sm:w-2/3">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {profile.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  <strong>DOB:</strong>{" "}
                  {new Date(profile.basic_information.dob).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Marital Status:</strong>{" "}
                  {profile.basic_information.marital_status}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Education:</strong> {profile.edu_occupation.edu_info}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Occupation:</strong>{" "}
                  {profile.edu_occupation.occupation_info || "Not Working"}
                </p>

                {/* Show More Button */}
                <button
                  onClick={() => handleToggleDetails(index)}
                  className="text-blue-600 hover:underline mt-4"
                >
                  {profile.showMore ? "Show Less" : "Show More"}
                </button>

                {/* More Details (Conditionally Rendered) */}
                {profile.showMore && (
                  <div className="mt-4 space-y-4">
                    {/* Contact Information */}
                    <div>
                      <p className="text-gray-600 mb-2">
                        <strong>Blood Group:</strong>{" "}
                        {profile.personal_information.blood_group}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Height:</strong>{" "}
                        {profile.personal_information.height}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Weight:</strong>{" "}
                        {profile.personal_information.weight} kg
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Complexion:</strong>{" "}
                        {profile.personal_information.complexion}
                      </p>
                    </div>

                    {/* WhatsApp link */}
                    <p className="text-gray-600">
                      <Link href={`https://wa.me/${profile.mobileNo}`} passHref>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          <strong>Contact on WhatsApp:</strong>{" "}
                          {profile.mobileNo}
                        </span>
                      </Link>
                    </p>

                    {/* Horoscope Section */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Horoscope Details
                      </h4>
                      <p className="text-gray-600">
                        <strong>Raasi:</strong>{" "}
                        {profile.horoscope_information.raasi}
                      </p>
                      <p className="text-gray-600">
                        <strong>Nachathiram:</strong>{" "}
                        {profile.horoscope_information.nachathiram}
                      </p>
                      <p className="text-gray-600">
                        <strong>Lagnam:</strong>{" "}
                        {profile.horoscope_information.lagnam}
                      </p>
                      <p className="text-gray-600">
                        <strong>Dhosam:</strong>{" "}
                        {profile.horoscope_information.dhosam}
                      </p>
                      <Link
                        href={profile.horoscope_information.document}
                        passHref
                      >
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          View Full Horoscope
                        </span>
                      </Link>
                    </div>

                    {/* Family Information */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Family Information
                      </h4>
                      <p className="text-gray-600">
                        <strong>Father:</strong>{" "}
                        {profile.family_information.father_name} (Business)
                      </p>
                      <p className="text-gray-600">
                        <strong>Mother:</strong>{" "}
                        {profile.family_information.mother_name} (Housewife)
                      </p>
                      <p className="text-gray-600">
                        <strong>No. of Brothers:</strong>{" "}
                        {profile.family_information.no_of_brothers}
                      </p>
                      <p className="text-gray-600">
                        <strong>No. of Sisters:</strong>{" "}
                        {profile.family_information.no_of_sisters}
                      </p>
                      <p className="text-gray-600">
                        <strong>Property Information:</strong>{" "}
                        {profile.family_information.property_info}
                      </p>
                    </div>

                    {/* Expectations Section */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Expectation Information
                      </h4>
                      <p className="text-gray-600 mb-2">
                        <strong>Expecting Stars:</strong>
                      </p>
                      <ul className="list-disc pl-6 text-gray-600">
                        {profile.expectation_information.expecting_stars.map(
                          (star: any, index: number) => (
                            <li key={index}>{star.value}</li>
                          )
                        )}
                      </ul>
                      <p className="text-gray-600 mt-4">
                        <strong>Expectation Info:</strong>{" "}
                        {profile.expectation_information.expectation_info}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-600">
            No profiles found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
