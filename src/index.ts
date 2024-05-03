import { AppSyncResolverEvent } from 'aws-lambda';
import { getParameter } from '@aws-lambda-powertools/parameters/ssm';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const handler = async (
  event: AppSyncResolverEvent<Request, null>,
): Promise<Response> => {
  const encodedFile = event.arguments.encodedFile;
  const fileData = Buffer.from(encodedFile, 'base64');

  const bucketName = await getParameter('/input-attendance/s3-bucket-name');
  const filePath = await getParameter('/input-attendance/s3-object-key');

  const s3Client = new S3Client({});

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: filePath,
    Body: fileData,
  });

  await s3Client.send(command);

  return {
    statusCode: 200,
  };
};

type Request = {
  encodedFile: string;
};

type Response = {
  statusCode: number;
};
