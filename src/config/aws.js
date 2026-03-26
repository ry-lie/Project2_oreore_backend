import dotenv from 'dotenv';
// Set AWS Key as Environment Variables
dotenv.config();

import { S3Client } from '@aws-sdk/client-s3'; // S3 Client to import from AWS SDK v3

export const AWS_REGION = process.env.AWS_REGION || 'ap-northeast-2';
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

// Creating AWS S3 Client (using AWS SDK v3)
const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key ID
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Access Key
    },
    endpoint: `https://s3.${process.env.AWS_REGION || 'ap-northeast-2'}.amazonaws.com`,
});

export default s3;
