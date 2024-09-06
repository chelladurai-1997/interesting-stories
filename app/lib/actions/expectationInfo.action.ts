"use server";

import connectMongo from "../constants/mongodb";
import Expectations from "../models/expectationInfo.model";

export async function onExpectationsInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const data = {
    jaadhagam: formData.get("jaadhagam"),
    marital_status: formData.get("marital_status"),
    working_place: formData.get("working_place"),
    expecting_stars: formData.get("expecting_stars"),
    expectation_info: formData.get("expectation_info"),
  };

  // Handle your form data (e.g., save to database)
  console.log("Form Data:", data);

  try {
    await connectMongo();
    // Save the user to the database
    const expectationsInfo = new Expectations(data);
    const res = await expectationsInfo.save();
    console.log("res", res);
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}
