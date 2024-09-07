"use server";

import connectMongo from "../constants/mongodb";
import PersonalDetails from "../models/personalInfo.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

export async function onPersonalInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  const data = {
    religion: formData.get("religion"),
    caste: formData.get("caste"),
    kulam: formData.get("kulam"),
    kula_deivam: formData.get("kula_deivam"),
    height: formData.get("height"),
    complexion: formData.get("complexion"),
    weight: formData.get("weight"),
    blood_group: formData.get("blood_group"),
    physically_challenged: formData.get("physically_challenged") === "Yes",
    physical_challenge_details: formData.get("physical_challenge_details"),
    userId,
  };

  try {
    await connectMongo();
    // Save the user to the database
    const personalInfo = new PersonalDetails(data);
    const res = await personalInfo.save();
    console.log(res);
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
