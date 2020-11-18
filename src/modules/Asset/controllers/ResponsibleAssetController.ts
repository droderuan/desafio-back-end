import { Request, Response } from 'express';

import AppError from '@errors/AppError';
import UserModel from '@modules/User/schemas/UserModel';
import AssetModel from '../Schemas/AssetModel';

export default class AssetController {
  public async patch(request: Request, response: Response): Promise<Response> {
    const { assetId } = request.params;

    const { responsibleId } = request.body;

    const assetToUpdate = await AssetModel.findById(assetId);

    if (!assetToUpdate) {
      throw new AppError('Asset does not exist. Please, check the id');
    }

    if (
      assetToUpdate.responsible &&
      assetToUpdate.responsible.toString() !== responsibleId
    ) {
      const responsibleToRemoveAsset = await UserModel.findById(
        assetToUpdate.responsible,
      );

      if (responsibleToRemoveAsset) {
        console.log('entrou no responsibleToRemoveAsset');
        responsibleToRemoveAsset.responsibleAssets = responsibleToRemoveAsset.responsibleAssets.filter(
          asset => asset.id !== assetId,
        );
        await responsibleToRemoveAsset.save();
      }
    }

    const user = await UserModel.findById(responsibleId);

    if (!user) {
      throw new AppError('User does not exist. Please, check the id');
    }

    const checkIfAlreadyHasAsset = user.responsibleAssets.find(asset => {
      return asset.toString() === assetId;
    });

    if (!checkIfAlreadyHasAsset) {
      user.responsibleAssets.push(assetToUpdate.id);
      await user.save();
    }

    assetToUpdate.responsible = user.id;

    await assetToUpdate.save();

    assetToUpdate.populate('responsible');

    return response.json(assetToUpdate);
  }
}
