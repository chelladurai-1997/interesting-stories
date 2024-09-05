"use server";
import User from "@/app/lib/models/user.model";
import connectMongo from "@/app/lib/constants/mongodb";

export async function onSignUpFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  try {
    const username = formData.get("name");
    const password = formData.get("password");
    const mobile = formData.get("mobileNo");
    const agreeToTermsAndConditions = formData.get("agree") === "on";
    await connectMongo();
    // Create a new user
    const newUser = new User({
      username: username,
      password: password,
      mobile,
      agreeToTermsAndConditions,
    });

    // Save the user to the database
    const result = await newUser.save();

    return { message: "success", error: false, userId: result.toJSON()?.id };
  } catch (error) {
    return { message: "Something went wrong!", error: true };
  }
}
