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
    try {
      await this.s3Client
        .deleteObject({
          Bucket: 'desafio-tractian',
          Key: fileName,
        })
        .promise();
    } catch (err) {
      throw new AppError(err);
    }
  }
}
