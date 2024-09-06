"use server";

import connectMongo from "../constants/mongodb";
import EducationOccupation from "../models/educationOccupation.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

export async function onEduOccupationFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  const education = formData.get("education");
  const educationInfo = formData.get("educationInfo");
  const occupation = formData.get("occupation");
  const occupationInfo = formData.get("occupationInfo");
  const workingPlace = formData.get("workingPlace");
  const monthlyIncome = formData.get("monthlyIncome");

  const data = {
    education,
    educationInfo,
    occupation,
    occupationInfo,
    workingPlace,
    monthlyIncome,
    userId,
  };

  try {
    await connectMongo();
    // Save the user to the database
    const basicInfo = new EducationOccupation(data);
    await basicInfo.save();
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
