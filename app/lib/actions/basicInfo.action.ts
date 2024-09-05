"use server";

import connectMongo from "../constants/mongodb";
import BasicInformation from "../models/basicinfo.model";

export async function onBasicInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const data = {
    name: formData.get("name") as string,
    gender: formData.get("gender") as string,
    dob: formData.get("dob") as string,
    profile_created_by: formData.get("profile_created_by") as string,
    marital_status: formData.get("marital_status") as string,
    children: formData.get("children") as string,
    children_living_status: formData.get("children_living_status") as string,
    profile_bio: formData.get("profile_bio") as string,
  };

  // Handle your form data (e.g., save to database)
  console.log("Form Data:", data);

  try {
    await connectMongo();
    // Save the user to the database
    const basicInfo = new BasicInformation(data);
    const res = await basicInfo.save();
    console.log("res", res);
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
