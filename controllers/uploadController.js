import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary if environment variables present
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadImage = async (req, res, next) => {
  try {
    const { image } = req.body; // Can be base64 data string or file buffer

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    // Check if Cloudinary is configured
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'labradorite_motto',
      });
      return res.json({
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    } else {
      // Fallback: If no Cloudinary config, return base64 string directly so uploads work seamlessly!
      return res.json({
        success: true,
        url: image,
        message: 'Uploaded as data URI (Set Cloudinary env keys for production cloud storage)',
      });
    }
  } catch (error) {
    next(error);
  }
};
