import sharp from "sharp";

export const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  try {
    return await sharp(buffer)
      .resize({ width: 1200 })   
      .jpeg({ quality: 60 })    
      .toBuffer();
  } catch (error) {
    console.log("Image compression failed:", error);
    return buffer;
  }
};
