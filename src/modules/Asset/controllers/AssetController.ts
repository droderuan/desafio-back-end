import { Request, Response } from 'express';

import AppError from '@errors/AppError';
import UserModel from '@modules/User/schemas/UserModel';
import UnitModel from '@modules/Unit/schemas/UnitModel';
import AssetModel from '../Schemas/AssetModel';

interface ICreateRequest {
  name: string;
  description: string;
  type: string;
  modelName: string;
  state: 'Disponível' | 'Em manutenção' | 'Desativado';
  healthscore: number;
  responsibleId: string;
  unitId: string;
  companyId: string;
}

interface IUpdateRequest {
  name: string;
  description: string;
  type: string;
  modelName: string;
  state: 'Disponível' | 'Em manutenção' | 'Desativado';
  healthscore: number;
  unitId: string;
}

export default class AssetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: companyId } = request.company;

    const { unitId, ...bodyData } = <ICreateRequest>request.body;

    const user = await UserModel.findById(bodyData.responsibleId);

    const unit = await UnitModel.findById(unitId);

    if (!unit) {
      throw new AppError('Unit does not exist. Please, check the id');
    }

    const checkAssetExist = unit.assets.find(
      asset => asset.name === bodyData.name,
    );

    if (checkAssetExist) {
      throw new AppError(`Asset name already exist`, 400);
    }

    const newAsset = new AssetModel({
      responsible: user ? user.id : null,
      company: companyId,
      ...bodyData,
    });
    await newAsset.save();

    unit.assets.push(newAsset);
    await unit.save();

    if (user) {
      user.responsibleAssets.push(newAsset);
      await user.save();
    }

    newAsset.populate('responsible');

    return response.json(newAsset);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { assetId } = request.params;
    const { name, state, modelName, type, description, healthscore, unitId } = <
      IUpdateRequest
    >request.body;

    const updatedAsset = await AssetModel.findOneAndUpdate(
      { _id: assetId },
      { name, state, modelName, type, description, healthscore },
      { new: true, useFindAndModify: false },
    );

    if (!updatedAsset) {
      throw new AppError('Asset does not exist. Please, check the id');
    }

    const unit = await UnitModel.findById(unitId);

    if (!unit) {
      throw new AppError('Unit does not exist. Please, check the id');
    }

    if (updatedAsset.unit?.id !== unitId) {
      const unitToUpdate = await UnitModel.findById(unitId);
      if (unitToUpdate) {
        unitToUpdate.assets = unitToUpdate.assets.filter(
          asset => asset.id !== updatedAsset.id,
        );

        unitToUpdate.save();
      }
      unit.assets.push(updatedAsset);
    }

    await unit.save();

    updatedAsset.populate('responsible');

    return response.json(updatedAsset);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { assetId } = request.params;
    const { unitId } = request.body;

    const assetToDelete = await AssetModel.findById(assetId);

    if (!assetToDelete) {
      throw new AppError('Trying to delete a unexist asset', 400);
    }

    if (unitId) {
      const unitToUpdate = await UnitModel.findById(unitId);

      if (unitToUpdate) {
        unitToUpdate.removeAsset(assetId);
      }
    }

    assetToDelete.remove();

    return response.status(200).json();
  }
}
