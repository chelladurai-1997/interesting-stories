"use server";

import connectMongo from "../constants/mongodb";
import ContactInfo from "../models/contactInfo.model";
import fs from "fs";
import path from "path";

const uploadPath = path.join(__dirname, "../uploads/profile-images");

export async function onContactInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const data = {
    mobile: formData.get("mobile"),
    sameAsMobile: formData.get("sameAsMobile") === "on", // Checkbox value
    whatsapp: formData.get("whatsapp"),
    country: formData.get("country"),
    state: formData.get("state"),
    district: formData.get("district"),
    address: formData.get("profile_address"),
    photo: formData.get("photo") as File, // This will be the file input
    pin_code: formData.get("pin_code"),
  };
  console.log(Object.fromEntries(formData));

  let filePath = "";

  try {
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Handle file upload
    const uploadFile = data.photo as File;
    if (uploadFile) {
      const fileBuffer = Buffer.from(await uploadFile.arrayBuffer());
      filePath = path.join(uploadPath, uploadFile.name);
      fs.writeFileSync(filePath, fileBuffer);
    }

    // Connect to MongoDB
    await connectMongo();

    // Save to database
    const contactInfo = new ContactInfo({
      mobile: formData.get("mobile"),
      sameAsMobile: formData.get("sameAsMobile") === "on", // Checkbox value
      whatsapp: formData.get("whatsapp"),
      country: formData.get("country"),
      state: formData.get("state"),
      district: formData.get("district"),
      address: formData.get("address"),
      photo: filePath, // This will be the file input
      pin_code: formData.get("pin_code"),
    });

    const res = await contactInfo.save();
    console.log("Save Result:", res);

    return { message: "success", error: false };
  } catch (error) {
    console.error("Error Details:", error);

    let errorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        errorMessage = "File not found or path issue.";
      } else if (error.message.includes("EACCES")) {
        errorMessage = "Permission denied while accessing file.";
      } else if (error.message.includes("MongoError")) {
        errorMessage = "Database error occurred.";
      } else {
        errorMessage = error.message;
      }
    }

    return { message: errorMessage, error: true };
  }
}
