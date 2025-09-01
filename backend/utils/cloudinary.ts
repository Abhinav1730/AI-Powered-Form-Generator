import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Check if Cloudinary is configured
const isCloudinaryConfigured = cloudName && apiKey && apiSecret;

if (isCloudinaryConfigured) {
  // Configure Cloudinary only if all variables are present
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export interface UploadResult {
  secure_url: string;
  public_id: string;
}

export const uploadFile = async (fileBuffer: Buffer, folder: string = 'forms'): Promise<UploadResult> => {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
  }

  try {
    // Convert buffer to base64 string
    const base64File = fileBuffer.toString('base64');
    const dataURI = `data:application/octet-stream;base64,${base64File}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(`Failed to upload file to Cloudinary: ${error}`);
  }
};

export const deleteFile = async (publicId: string): Promise<void> => {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(`Failed to delete file from Cloudinary: ${error}`);
  }
};

export default cloudinary;
