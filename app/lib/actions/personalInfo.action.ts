"use server";

import connectMongo from "../constants/mongodb";
import PersonalDetails from "../models/personalInfo.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { updateUserLastCompletedStep } from "../utils/userUtils";

export async function onPersonalInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const { userId, error, message } = getUserIdFromToken();
  if (error) {
    return { message, error };
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
    await personalInfo.save();

    // Call the utility function but don't wait for it
    updateUserLastCompletedStep({ userId: userId!, step: 2 });

    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
