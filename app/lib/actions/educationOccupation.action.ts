"use server";

import connectMongo from "../constants/mongodb";
import EducationOccupation from "../models/educationOccupation.model";

export async function onEduOccupationFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
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
  };

  // Handle your form data (e.g., save to database)
  console.log("Form Data:", data);

  try {
    await connectMongo();
    // Save the user to the database
    const basicInfo = new EducationOccupation(data);
    const res = await basicInfo.save();
    console.log("res", res);
    return { message: "success", error: false };
  } catch (error) {
    console.log("err", error);
    return { message: "Something went wrong!", error: true };
  }
}

// Step 3: Retrieve form values
// const education = formData.get("education");
// const educationInfo = formData.get("educationInfo");
// const occupation = formData.get("occupation");
// const occupationInfo = formData.get("occupationInfo");
// const workingPlace = formData.get("workingPlace");
// const monthlyIncome = formData.get("monthlyIncome");

// console.log("Form Submitted: ", {
//   education,
//   educationInfo,
//   occupation,
//   occupationInfo,
//   workingPlace,
//   monthlyIncome,
// });
