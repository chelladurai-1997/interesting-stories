import { NextResponse } from "next/server";
import { MongoClient, GridFSBucket, ObjectId, Db } from "mongodb";
import { MONGO_URI } from "@/app/lib/constants/mongodb";

// Define types for MongoDB connection and GridFS Bucket
let cachedDb: Db | null = null;

// In-memory cache for files
const fileCache = new Map<string, { buffer: Buffer; contentType: string }>();

// Function to establish connection to MongoDB
async function getMongoNativeConnection(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(MONGO_URI as string);
  await client.connect();
  cachedDb = client.db();
  return cachedDb; // Return the database instance
}

// Utility function to convert readable stream to a Buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

// Define types for the request parameters and file details
type FileDetails = {
  _id: ObjectId;
  filename: string;
  contentType?: string;
};

// The main GET function to handle file retrieval based on dynamic route
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id: gridFSId } = params;

    if (!gridFSId) {
      return NextResponse.json(
        { message: "File ID is required" },
        { status: 400 }
      );
    }

    // Check if file is already in cache
    if (fileCache.has(gridFSId)) {
      const cachedFile = fileCache.get(gridFSId)!;

      return new NextResponse(cachedFile.buffer, {
        status: 200,
        headers: {
          "Content-Type": cachedFile.contentType,
          "Content-Disposition": `inline; filename="${gridFSId}"`,
          "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
        },
      });
    }

    // Convert the gridFSId to a MongoDB ObjectId
    let fileId: ObjectId;
    try {
      fileId = new ObjectId(gridFSId);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid file ID format" },
        { status: 400 }
      );
    }

    // Connect to MongoDB and get the GridFS bucket
    const db = await getMongoNativeConnection();
    const bucket = new GridFSBucket(db, { bucketName: "profileImages" });

    // Retrieve file metadata to get file details
    const fileDetails = (await bucket.find({ _id: fileId }).toArray())[0] as
      | FileDetails
      | undefined;

    if (!fileDetails) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // Create a download stream from GridFS
    const downloadStream = bucket.openDownloadStream(fileId);
    const fileBuffer = await streamToBuffer(downloadStream);

    // Set content-type based on file metadata or fallback to a default
    const contentType = fileDetails?.contentType || "application/octet-stream";

    // Cache the file for future requests
    fileCache.set(gridFSId, { buffer: fileBuffer, contentType });

    // Return the file buffer with cache headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${fileDetails.filename}"`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching file:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching the file." },
      { status: 500 }
    );
  }
}
