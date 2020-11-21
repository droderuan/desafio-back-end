import { Request, Response } from 'express';
import 'express-async-errors';

import AppError from '@errors/AppError';
import CompanyModel from '../schemas/CompanyModel';

class CompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;

    const company = await CompanyModel.findById(companyId).populate([
      {
        path: 'units',
        select: { __v: 0, createdAt: 0, updatedAt: 0, company: 0 },
        populate: {
          path: 'assets',
          select: {
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            company: 0,
          },
          populate: {
            path: 'responsible',
            select: {
              _id: 1,
              name: 1,
            },
          },
        },
      },
      {
        path: 'employeers',
        select: { __v: 0, createdAt: 0, updatedAt: 0, company: 0 },
        populate: {
          path: 'responsibleAssets',
          select: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);

    if (!company) {
      throw new AppError(`Company with ${companyId} does not exist`, 406);
    }

    return response.json(company);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const company = await CompanyModel.create(data);

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;

    const { name } = request.body;

    if (!companyId || !name) {
      throw new AppError('Id and Name required', 400);
    }

    const company = await CompanyModel.findOneAndUpdate(
      { _id: companyId },
      { name },
      { new: true, useFindAndModify: false },
    );

    return response.json(company);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;

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
