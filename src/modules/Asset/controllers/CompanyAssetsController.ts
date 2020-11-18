import { Request, Response } from 'express';

import AssetModel from '../Schemas/AssetModel';

export default class AssetController {
  public async list(request: Request, response: Response): Promise<Response> {
    const companyId = request.company.id;

    const allAssets = await AssetModel.find({ company: companyId });

    return response.json(allAssets);
  }
}
