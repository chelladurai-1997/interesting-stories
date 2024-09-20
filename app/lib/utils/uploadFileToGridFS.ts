import { GridFSBucket } from "mongodb";

// Helper function to handle file upload to GridFS
export async function uploadFileToGridFS(
  file: File,
  bucket: GridFSBucket,
  userId: string
): Promise<string | null> {
  let imageUrl: string | null = null;

  if (file) {
    console.log(`Starting upload for file: ${file.name}`);

    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
      metadata: {
        originalName: file.name,
        uploadedBy: userId,
        size: file.size,
      },
    });

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await new Promise<void>((resolve, reject) => {
      uploadStream.end(fileBuffer);

      uploadStream.on("finish", () => {
        imageUrl = `/api/file/${uploadStream.id}`;
        console.log(`Upload completed for file: ${file.name}`);
        resolve();
      });

      uploadStream.on("error", (error) => {
        console.error(`Upload failed for file: ${file.name}`, error);
        reject(error);
      });
    });
  }

  return imageUrl;
}
