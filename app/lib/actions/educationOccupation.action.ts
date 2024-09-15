"use server";

import connectMongo from "../constants/mongodb";
import EducationOccupation from "../models/educationOccupation.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

export async function onEduOccupationFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const { userId, error, message } = getUserIdFromToken();
  if (error) {
    return { message, error };
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
