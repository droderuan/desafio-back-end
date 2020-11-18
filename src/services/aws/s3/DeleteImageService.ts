import aws, { S3 } from 'aws-sdk';

import AppError from '@errors/AppError';

export default class UploadImageService {
  private s3Client: S3;

  constructor() {
    this.s3Client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async execute(fileName: string): Promise<void> {
    const bucketName = process.env.AWS_S3_BUCKET;

    if (!bucketName) {
      throw new AppError(
        'Missing bucket name. Please, verify your environment variables',
      );
    }

    try {
      await this.s3Client
        .deleteObject({
          Bucket: bucketName,
          Key: fileName,
        })
        .promise();
    } catch (err) {
      throw new AppError(err);
    }
  }
}
