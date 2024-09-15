"use server";

import connectMongo from "../constants/mongodb";
import Expectations from "../models/expectationInfo.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

export async function onExpectationsInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const { userId, error, message } = getUserIdFromToken();
  if (error) {
    return { message, error };
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
    await expectationsInfo.save();
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
