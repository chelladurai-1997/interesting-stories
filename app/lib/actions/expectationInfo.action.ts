"use server";

import connectMongo from "../constants/mongodb";
import Expectations from "../models/expectationInfo.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

export async function onExpectationsInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  const data = {
    jaadhagam: formData.get("jaadhagam"),
    marital_status: formData.get("marital_status"),
    working_place: formData.get("working_place"),
    expecting_stars: formData.get("expecting_stars"),
    expectation_info: formData.get("expectation_info"),
    userId,
  };

  try {
    await connectMongo();
    // Save the user to the database
    const expectationsInfo = new Expectations(data);
    const res = await expectationsInfo.save();
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
