"use server";

import connectMongo from "../constants/mongodb";
import FamilyDetails from "../models/familyInfo.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

export async function onFamilyInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  const data = {
    fatherName: formData.get("father_name"),
    fatherStatus: formData.get("father_status"),
    motherName: formData.get("mother_name"),
    motherStatus: formData.get("mother_status"),
    fatherOccupation: formData.get("father_occupation"),
    motherOccupation: formData.get("mother_occupation"),
    motherKulam: formData.get("mother_kulam"),
    livingPlace: formData.get("living_place"),
    nativePlace: formData.get("native_place"),
    noOfBrothers: formData.get("no_of_brothers"),
    noOfBrothersMarried: formData.get("no_of_brothers_married"),
    noOfSisters: formData.get("no_of_sisters"),
    noOfSistersMarried: formData.get("no_of_sisters_married"),
    property: formData.get("property"),
    propertyInfo: formData.get("property_info"),
    userId,
  };

  try {
    await connectMongo();
    // Save the user to the database
    const basicInfo = new FamilyDetails(data);
    const res = await basicInfo.save();
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}