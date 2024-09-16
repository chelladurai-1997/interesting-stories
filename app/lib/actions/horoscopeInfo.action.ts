"use server";

import connectMongo from "../constants/mongodb";
import HoroscopeInfo from "../models/horoscopeInfo.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { updateUserLastCompletedStep } from "../utils/userUtils";

// AWS S3 Client
// const s3Client = new S3Client({ region: process.env.AWS_REGION }); // Enable this if AWS account is activated

export async function onHoroscopeInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const { userId, error, message } = getUserIdFromToken();
  if (error) {
    return { message, error };
  }

  // Extract form data
  const data = {
    raasi: formData.get("raasi"),
    nachathiram: formData.get("nachathiram"),
    lagnam: formData.get("lagnam"),
    dhisaiIrupu: formData.get("dhisai_irupu"),
    dhosam: formData.get("dhosam"),
    // upload: formData.get("upload") as File,
  };

  // Ensure a file was uploaded
  // const uploadFile = data.upload;
  // if (!uploadFile) {
  //   return { message: "File upload is required", error: true };
  // }

  try {
    // Generate a unique key for the file
    // const fileKey = uuidv4();

    // Upload the file to S3
    // const uploadParams = {
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: fileKey,
    //   Body: uploadFile,
    //   ACL: "public-read" as ObjectCannedACL, // Cast to the correct type
    //   ContentType: uploadFile.type,
    // };

    // await s3Client.send(new PutObjectCommand(uploadParams));

    // Construct the permanent URL of the uploaded image
    // const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const imageUrl =
      "https://media.istockphoto.com/id/1344523047/photo/zodiac-signs-inside-of-horoscope-circle-astrology-in-the-sky-with-many-stars-and-moons.jpg?s=1024x1024&w=is&k=20&c=beMk5e5ZC8pHGyJ8d1MJasvokv98918VPwWSFIGVA-k=";
    // Connect to MongoDB through Mongoose
    await connectMongo();

    // Save horoscope info along with the image URL to MongoDB
    const horoscopeInfo = new HoroscopeInfo({
      raasi: data.raasi,
      nachathiram: data.nachathiram,
      lagnam: data.lagnam,
      dhisaiIrupu: data.dhisaiIrupu,
      dhosam: data.dhosam,
      upload: imageUrl, // Save the permanent S3 image URL
      userId,
    });

    await horoscopeInfo.save();

    // Call the utility function but don't wait for it
    updateUserLastCompletedStep({ userId: userId!, step: 5 });

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
