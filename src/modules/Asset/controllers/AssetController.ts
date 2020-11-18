import { Request, Response } from 'express';

import AppError from '@errors/AppError';
import UserModel from '@modules/User/schemas/UserModel';
import UnitModel from '@modules/Unit/schemas/UnitModel';
import AssetModel from '../Schemas/AssetModel';

interface IRequest {
  name: string;
  description: string;
  type: string;
  model: string;
  state: 'Disponível' | 'Em manutenção' | 'Desativado';
  healthscore: number;
  responsibleId: string;
  unitId: string;
  companyId: string;
}

export default class AssetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { unitId, companyId, ...bodyData } = <IRequest>request.body;

    const user = await UserModel.findById(bodyData.responsibleId);

    if (!user) {
      throw new AppError('User does not exist. Please, check the id');
    }

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
      responsible: bodyData.responsibleId,
      company: companyId,
      ...bodyData,
    });
    await newAsset.save();

    unit.assets.push(newAsset);
    await unit.save();

    user.responsibleAssets.push(newAsset);
    await user.save();

    newAsset.populate('responsible');

    return response.json(newAsset);
  }
}
