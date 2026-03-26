import s3, { AWS_REGION, AWS_S3_BUCKET } from '../config/aws.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const fileController = {
    // Create Profile Image Presigned URL
    generateProfilePresignedUrl: async (req, res) => {
        const { fileName, fileType } = req.body; // Receive file name and type from client
        if (!fileName || !fileType) {
            return res.status(400).send('File name and type are required.');
        }

        try {
            const uniqueFileName = `profile/${Date.now()}_${fileName}`; // Unique File Name
            const params = {
                Bucket: AWS_S3_BUCKET,
                Key: uniqueFileName,
                ContentType: fileType,
                ACL: 'public-read',
            };

            // Create Presigned URL
            const presignedUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
                expiresIn: 3600, // URL Expiration (1 hour)
            });

            // Create S3 Object URL
            const s3ObjectUrl = `https://${params.Bucket}.s3.${AWS_REGION}.amazonaws.com/${uniqueFileName}`;
            res.status(200).json({ presignedUrl, s3ObjectUrl });
        } catch (error) {
            console.error('Failed to create presynd URL:', error);
            res.status(500).send('Failed to create presynd URL');
        }
    },

    // Create Product Image Presigned URL
    generateProductPresignedUrl: async (req, res) => {
        const { fileName, fileType } = req.body;
        if (!fileName || !fileType) {
            return res.status(400).send('File name and type are required.');
        }

        try {
            const uniqueFileName = `product/${Date.now()}_${fileName}`;
            const params = {
                Bucket: 'elice-project-oreore',
                Key: uniqueFileName,
                ContentType: fileType,
                ACL: 'public-read',
            };

            const presignedUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
                expiresIn: 3600,
            });

            const s3ObjectUrl = `https://${params.Bucket}.s3.${AWS_REGION}.amazonaws.com/${uniqueFileName}`;
            
            res.status(200).json({ presignedUrl, s3ObjectUrl });
        } catch (error) {
            console.error('Failed to create presynd URL:', error);
            res.status(500).send('Failed to create presynd URL');
        }
    },
};

export default fileController;
