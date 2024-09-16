"use server";

import connectMongo from "../constants/mongodb";
import BasicInformation from "../models/basicinfo.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { updateUserLastCompletedStep } from "../utils/userUtils";

export async function onBasicInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  try {
    await connectMongo();

    const { userId, error, message } = getUserIdFromToken();
    if (error) {
      return { message, error };
    }

    const data = {
      name: formData.get("name") as string,
      gender: formData.get("gender") as string,
      dob: formData.get("dob") as string,
      profile_created_by: formData.get("profile_created_by") as string,
      marital_status: formData.get("marital_status") as string,
      children: formData.get("children") as string,
      children_living_status: formData.get("children_living_status") as string,
      profile_bio: formData.get("profile_bio") as string,
      userId: userId, // Use the userId from the payload
    };

    // Save the user to the database
    const basicInfo = new BasicInformation(data);
    await basicInfo.save();

    updateUserLastCompletedStep({ userId: userId!, step: 1 });

    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
