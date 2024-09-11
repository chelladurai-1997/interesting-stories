"use server";

import connectMongo from "../constants/mongodb";
import BasicInformation from "../models/basicinfo.model";
import User from "../models/user.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

export async function onBasicInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  try {
    await connectMongo();

    // Get the user from the session token
    const { userId, error } = await getUserFromSessionToken();

    if (error || !userId) {
      return { message: error || "User not found", error: true };
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
      userId: userId,
    };

    // Save the user to the database
    const basicInfo = new BasicInformation(data);
    await basicInfo.save();
    const datal = await User.findByIdAndUpdate(
      userId,
      { lastCompletedStep: 1 },
      { new: true } // Return the updated document
    );
    console.log(datal);
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
