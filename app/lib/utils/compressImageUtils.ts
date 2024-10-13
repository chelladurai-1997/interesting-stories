import sharp from "sharp";

export async function reduceImageSize(
  fileBuffer: Buffer,
  minSizeKB: number = 150, // Set default min size to 150 KB
  maxSizeKB: number = 200, // Set default max size to 200 KB
  outputFormat: "webp" | "jpeg" | "png" = "webp", // Allow specifying output format
  maxRetries: number = 10 // Maximum number of retries for size reduction
): Promise<Buffer> {
  const compressImage = async (
    buffer: Buffer,
    width: number | null = null // Initially set to null to keep original size
  ): Promise<Buffer> => {
    let fileSizeInKB = Buffer.byteLength(buffer) / 1024;

    console.log(`Current file size: ${fileSizeInKB.toFixed(2)} KB`);

    // Check if the file is within the desired range
    if (fileSizeInKB <= maxSizeKB && fileSizeInKB >= minSizeKB) {
      console.log(`File is within range: ${fileSizeInKB.toFixed(2)} KB`);
      return buffer; // Return the buffer if within the desired size range
    }

    console.log(`Starting binary search for quality adjustment...`);

    let low = 1; // Minimum quality
    let high = 100; // Maximum quality
    let optimalBuffer: Buffer | null = null;

    // Reduce width if necessary
    const sharpInstance = sharp(buffer);
    if (fileSizeInKB > maxSizeKB && width === null) {
      const metadata = await sharpInstance.metadata();
      if (metadata.width) {
        width = Math.round(metadata.width * 0.5); // Reduce width by 50%
      } else {
        console.warn("Image width is not available, keeping original size.");
      }
    }

    let retryCount = 0; // Initialize retry counter

    // Binary search to find optimal quality
    while (low <= high && retryCount < maxRetries) {
      const mid = Math.floor((low + high) / 2);
      console.log(`Trying quality: ${mid}%, width: ${width || "original"}`);

      let sharpBuffer: Buffer;

      try {
        sharpBuffer = await sharpInstance
          .resize(width) // width may still be null
          [outputFormat]({ quality: mid }) // Dynamically set output format
          .toBuffer();
      } catch (error) {
        console.error(`Error processing image at quality ${mid}:`, error);
        return buffer; // Return the original buffer if there is an error
      }

      // Update file size after compression
      fileSizeInKB = Buffer.byteLength(sharpBuffer) / 1024;
      console.log(
        `Compressed file size: ${fileSizeInKB.toFixed(
          2
        )} KB at quality: ${mid}%`
      );

      // Check size and adjust binary search range
      if (fileSizeInKB > maxSizeKB) {
        high = mid - 1; // Too large, decrease quality
      } else if (fileSizeInKB < minSizeKB) {
        optimalBuffer = sharpBuffer; // Save buffer as optimal
        low = mid + 1; // Increase quality range
      } else {
        console.log(`File is within range: ${fileSizeInKB.toFixed(2)} KB`);
        return sharpBuffer; // Return if it's within range
      }

      retryCount++; // Increment retry counter
    }

    // Return the last optimal buffer found
    if (optimalBuffer) {
      console.log("Returning optimal buffer found.");
      return optimalBuffer;
    }

    // Fallback if no optimal buffer was found
    console.warn("No optimal buffer found. Returning last processed buffer.");
    try {
      return sharp(buffer)
        [outputFormat]({ quality: high }) // Use the last quality attempt
        .toBuffer();
    } catch (error) {
      console.error("Error during final buffer processing:", error);
      return buffer; // Return the original buffer on error
    }
  };

  return compressImage(fileBuffer); // Start the recursive compression
}
