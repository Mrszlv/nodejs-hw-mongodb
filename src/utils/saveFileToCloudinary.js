import cloudinary from 'cloudinary';
import * as fs from 'fs/promises';

import { env } from './env.js';
import { CLOUDINARY } from '../constans/constans.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (filePath) => {
  const response = await cloudinary.v2.uploader.upload(filePath);
  await fs.unlink(filePath);
  return response.secure_url;
};
