import path from 'path';
import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import UploadConfig from '@config/multer/Upload';
import AppError from '@errors/AppError';

export default class UploadImageService {
  private s3Client: S3;

  constructor() {
    this.s3Client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async execute(fileName: string): Promise<string> {
    const filePath = path.resolve(UploadConfig.tmpFolder, fileName);

    const file = await fs.promises.readFile(filePath);

    const contentType = mime.getType(filePath);

    if (!contentType) {
      throw new AppError('File was not found. Try again', 500);
    }

    const bucketName = process.env.AWS_S3_BUCKET;

    if (!bucketName) {
      throw new AppError('Missing bucket name. Please, verify your .env');
    }

    try {
      await this.s3Client
        .putObject({
          Bucket: bucketName,
          Key: fileName,
          ACL: 'public-read',
          Body: file,
          ContentType: contentType,
        })
        .promise();

      return fileName;
    } catch (err) {
      throw new AppError(err);
    } finally {
      fs.promises.unlink(filePath);
    }
  }
}
