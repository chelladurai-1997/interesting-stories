import sharp from "sharp";

export async function reduceImageSize(
  fileBuffer: Buffer,
  minSizeKB: number = 200, // Default min size
  maxSizeKB: number = 300 // Default max size
): Promise<Buffer> {
  let buffer = fileBuffer;
  let fileSizeInKB = Buffer.byteLength(buffer) / 1024;
  let quality = 85;
  let width: number | null = null; // Initially set to null to keep original size

  console.log(`Initial file size: ${fileSizeInKB.toFixed(2)} KB`);

  while (
    (fileSizeInKB > maxSizeKB || fileSizeInKB < minSizeKB) &&
    quality > 10
  ) {
    console.log(`Trying quality: ${quality}%, width: ${width || "original"}`);

    const sharpInstance = sharp(buffer);

    if (fileSizeInKB > maxSizeKB && width === null) {
      const metadata = await sharpInstance.metadata();
      if (metadata.width) {
        // Check if width is defined
        width = Math.round(metadata.width * 0.5); // Reduce width by 50%
      } else {
        console.warn("Image width is not available, keeping original size.");
      }
    }

    // Compress and resize using WebP
    const sharpBuffer = await sharpInstance
      .resize(width) // width may still be null
      .webp({ quality })
      .toBuffer();

    buffer = sharpBuffer;
    fileSizeInKB = Buffer.byteLength(sharpBuffer) / 1024;

    console.log(
      `Compressed file size: ${fileSizeInKB.toFixed(
        2
      )} KB at quality: ${quality}%`
    );

    if (fileSizeInKB > maxSizeKB) {
      quality -= 5; // Decrease quality
    } else if (fileSizeInKB < minSizeKB && quality < 100) {
      quality += 5; // Increase quality if needed
    }
  }

  console.log(`Final compressed file size: ${fileSizeInKB.toFixed(2)} KB`);
  console.log(`Image processing complete with final quality: ${quality}%`);

  return buffer; // Return the compressed buffer
}
