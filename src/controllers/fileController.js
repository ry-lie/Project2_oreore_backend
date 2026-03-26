import s3, { AWS_REGION, AWS_S3_BUCKET } from '../config/aws.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Sanitize uploaded filenames for S3 object URLs
const sanitizeFileName = (fileName) => {
  const trimmed = fileName.trim();
  return trimmed
    .replace(/\s+/g, '-')        // Blank -> Hyphen
    .replace(/[^\w.-]/g, '');    // Remove special characters
};

// Create shared presigned upload data
const createPresignedUpload = async ({ folder, fileName, fileType }) => {
  const safeFileName = sanitizeFileName(fileName);
  const uniqueFileName = `${folder}/${Date.now()}_${safeFileName}`;

  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: uniqueFileName,
    ContentType: fileType,
    ACL: 'public-read',
  };

  const presignedUrl = await getSignedUrl(
    s3,
    new PutObjectCommand(params),
    { expiresIn: 3600 }
  );

  const s3ObjectUrl = `https://${params.Bucket}.s3.${AWS_REGION}.amazonaws.com/${uniqueFileName}`;

  return { presignedUrl, s3ObjectUrl };
};

const fileController = {
    // Create Profile Image Presigned URL
    generateProfilePresignedUrl: async (req, res) => {
        const { fileName, fileType } = req.body; // Receive file name and type from client

        if (!fileName || !fileType) {
            return res.status(400).send('File name and type are required.');
        }

        try {
            const result = await createPresignedUpload({
                folder: 'profile',
                fileName,
                fileType,
            });

            return res.status(200).json(result);
        } catch (error) {
        console.error('Failed to create presigned URL:', error);
        return res.status(500).send('Failed to create presigned URL');
        }
    },

    // Create Product Image Presigned URL
    generateProductPresignedUrl: async (req, res) => {
        const { fileName, fileType } = req.body;
        if (!fileName || !fileType) {
            return res.status(400).send('File name and type are required.');
        }

        try {
            const result = await createPresignedUpload({
                folder: 'product',
                fileName,
                fileType,
            });

            return res.status(200).json(result);
        } catch (error) {
        console.error('Failed to create presigned URL:', error);
        return res.status(500).send('Failed to create presigned URL');
        }
    },
};

export default fileController;
