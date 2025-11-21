import cloudinary from "../config/cloudinary";
import { PDFDocument } from "pdf-lib";

export interface CloudinaryUploadResponse {
  secure_url: string;
  url?: string;
  public_id?: string;
  [key: string]: any;
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<CloudinaryUploadResponse> => {
  let uploadOptions: any = { folder, resource_type: "auto" };

  const isPDF = buffer.slice(0, 4).toString() === "%PDF";

  if (isPDF) {
    uploadOptions.resource_type = "raw";

    try {
      const pdfDoc = await PDFDocument.load(buffer);
      buffer = Buffer.from(await pdfDoc.save({ useObjectStreams: true }));
    } catch (e) {
      console.log("PDF compression failed → uploading original PDF");
    }
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(uploadOptions, (err, result) => {
        if (err) return reject(err);
        resolve(result as CloudinaryUploadResponse);
      })
      .end(buffer);
  });
};
