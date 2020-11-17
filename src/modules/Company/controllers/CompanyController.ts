import { Request, Response } from 'express';

import AppError from '@errors/AppError';
import CompanyModel from '../schemas/CompanyModel';

class CompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const company = await CompanyModel.findById(id).populate([
      'units',
      'employeers',
    ]);

    if (!company) {
      throw new AppError(`Company with ${id} does not exist`, 406);
    }

    return response.json(company);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const company = await CompanyModel.create(data);

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const company = await CompanyModel.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, useFindAndModify: false },
    );

    return response.json(company);
  }
}

export default CompanyController;
