"use server";

import connectMongo, { MONGO_URI } from "../constants/mongodb";
import HoroscopeInfo from "../models/horoscopeInfo.model";
import sharp from "sharp"; // Ensure sharp is imported in a server-only context
import { GridFSBucket, MongoClient } from "mongodb";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { updateUserLastCompletedStep } from "../utils/userUtils";

// Define a type for the data extracted from FormData
interface HoroscopeFormData {
  raasi: string | null;
  nachathiram: string | null;
  lagnam: string | null;
  dhisaiIrupu: string | null;
  dhosam: string | null;
  upload: File | null;
}

// Function to handle the image compression
async function compressImage(file: File): Promise<Buffer> {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Use sharp to resize and compress the image
  const compressedImage = await sharp(buffer)
    .resize(800) // Resize based on your needs
    .jpeg({ quality: 80 }) // Compress to ~300KB
    .toBuffer();

  return compressedImage;
}

// Server Action to handle the horoscope form submission
export async function onHoroscopeInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
): Promise<{ message: string; error: boolean }> {
  // Function to get a native MongoDB connection for GridFS
  async function getMongoNativeConnection() {
    const client = new MongoClient(MONGO_URI!);
    await client.connect();
    return client.db(); // Return the database instance
  }

  const { userId, error } = getUserIdFromToken();
  if (error || !userId) {
    return { message: "Unauthorized", error: true };
  }

  // Extract the form data and type-cast to the interface
  const data: HoroscopeFormData = {
    raasi: formData.get("raasi") as string | null,
    nachathiram: formData.get("nachathiram") as string | null,
    lagnam: formData.get("lagnam") as string | null,
    dhisaiIrupu: formData.get("dhisai_irupu") as string | null,
    dhosam: formData.get("dhosam") as string | null,
    upload: formData.get("upload") as File | null,
  };

  if (!data.upload) {
    return { message: "File upload is required", error: true };
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Compress the uploaded image using sharp
    const compressedImage = await compressImage(data.upload);

    // Use MongoDB's native connection for GridFS
    const db = await getMongoNativeConnection();
    const bucket = new GridFSBucket(db, { bucketName: "profileImages" });

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(data.upload.name, {
      contentType: data.upload.type,
      metadata: { originalName: data.upload.name, uploadedBy: userId },
    });

    uploadStream.end(compressedImage);

    // Generate the image URL
    const imageUrl = `/api/file/${uploadStream.id}`;

    // Save horoscope info in MongoDB
    const horoscopeInfo = new HoroscopeInfo({
      raasi: data.raasi,
      nachathiram: data.nachathiram,
      lagnam: data.lagnam,
      dhisaiIrupu: data.dhisaiIrupu,
      dhosam: data.dhosam,
      upload: imageUrl, // Store the image URL
      userId,
    });

    await horoscopeInfo.save();

    // Update user step (e.g., update the last completed step for the user)
    updateUserLastCompletedStep({ userId, step: 5 });

    return { message: "Horoscope info saved successfully", error: false };
  } catch (error) {
    console.error("Error occurred:", error);

    return {
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while saving the horoscope info.",
      error: true,
    };
  }
}
