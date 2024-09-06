"use server";

import connectMongo from "../constants/mongodb";
import HoroscopeInfo from "../models/horoscopeInfo.model";
import fs from "fs";
import path from "path";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

const uploadPath = path.join(__dirname, "../uploads/");

export async function onHoroscopeInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }
  const data = {
    raasi: formData.get("raasi"),
    nachathiram: formData.get("nachathiram"),
    lagnam: formData.get("lagnam"),
    dhisaiIrupu: formData.get("dhisai_irupu"),
    dhosam: formData.get("dhosam"),
    upload: formData.get("upload") as File, // Cast to File if you need to handle file uploads
  };

  let filePath = "";

  try {
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Handle file upload
    const uploadFile = data.upload as File;
    if (uploadFile) {
      const fileBuffer = Buffer.from(await uploadFile.arrayBuffer());
      filePath = path.join(uploadPath, uploadFile.name);
      fs.writeFileSync(filePath, fileBuffer);
    }

    // Connect to MongoDB
    await connectMongo();

    // Save to database
    const basicInfo = new HoroscopeInfo({
      raasi: data.raasi,
      nachathiram: data.nachathiram,
      lagnam: data.lagnam,
      dhisaiIrupu: data.dhisaiIrupu,
      dhosam: data.dhosam,
      upload: filePath, // Save the path or URL of the file
      userId,
    });

    await basicInfo.save();

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
