import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

interface IUploadConfig {
  tmpFolder: string;
  uploadAssetsFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadAssetsFolder: path.resolve(tmpFolder, 'assets', 'images'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileNameHash = crypto.randomBytes(5).toString('hex');
        const parsedOriginalFileName = file.originalname.replace(/\s/g, '-');
        const filename = `${fileNameHash}-${parsedOriginalFileName}`;

        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
