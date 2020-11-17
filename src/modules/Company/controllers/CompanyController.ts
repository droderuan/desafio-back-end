import { Request, Response } from 'express';
import 'express-async-errors';

import AppError from '@errors/AppError';
import CompanyModel from '../schemas/CompanyModel';

class CompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const company = await CompanyModel.findById(id).populate([
      {
        path: 'units',
        select: { __v: 0, createdAt: 0, updatedAt: 0, company: 0 },
      },
      {
        path: 'employeers',
        select: { __v: 0, createdAt: 0, updatedAt: 0, company: 0 },
      },
    ]);

    if (!company) {
      throw new AppError(`Company with ${id} does not exist`, 406);
    }

    return response.json(company);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const checkCompanyExist = await CompanyModel.findOne({
      name: data.name,
    }).exec();

    if (checkCompanyExist) {
      throw new AppError('Company name already in use');
    }

    const company = await CompanyModel.create(data);

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    if (!id || !name) {
      throw new AppError('Id and Name required');
    }

    const company = await CompanyModel.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, useFindAndModify: false },
    );

    return response.json(company);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.body;

    const company = await CompanyModel.findById(companyId);

    if (!company) {
      throw new AppError('Company does not exist', 404);
    }

    company.isDeleted = true;

    await company.save();

    return response.json(company);
  }
}

export default CompanyController;
