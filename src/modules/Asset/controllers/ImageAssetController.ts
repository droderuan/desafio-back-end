import { Request, Response } from 'express';

import UploadImageService from '@services/aws/s3/UploadImageService';
import DeleteImageService from '@services/aws/s3/DeleteImageService';

export default class ImageAssetController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadImageService = new UploadImageService();

    const fileName = request.file.filename;

    await uploadImageService.execute(fileName);

    return response.status(200).json(fileName);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteImageService = new DeleteImageService();

    const { fileName } = request.body;

    await deleteImageService.execute(fileName);

    return response.status(200).json();
  }
}
