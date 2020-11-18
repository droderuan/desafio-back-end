import { Request, Response } from 'express';

import UploadImageService from '@services/aws/s3/UploadImageService';
import DeleteImageService from '@services/aws/s3/DeleteImageService';

import AppError from '@errors/AppError';
import AssetModel from '../Schemas/AssetModel';

export default class ImageAssetController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { assetId } = request.params;
    const { description } = request.body;
    const fileName = request.file.filename;

    const checkAsset = await AssetModel.findById(assetId);

    if (!checkAsset) {
      throw new AppError(
        'Asset not found while trying to upload image. Please, check the id',
        400,
      );
    }

    if (checkAsset.image.name) {
      const deleteImageService = new DeleteImageService();
      deleteImageService.execute(checkAsset.image.name);
    }

    const uploadImageService = new UploadImageService();

    await uploadImageService.execute(fileName);

    checkAsset.image.name = fileName;
    checkAsset.image.description = description;

    await checkAsset.save();

    return response.status(200).json(checkAsset);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteImageService = new DeleteImageService();

    const { fileName } = request.body;

    await deleteImageService.execute(fileName);

    return response.status(200).json();
  }
}
