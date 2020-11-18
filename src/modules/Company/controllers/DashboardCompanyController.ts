import { Request, Response } from 'express';

import CompanyModel from '../schemas/CompanyModel';

class CompanyController {
  public async list(request: Request, response: Response): Promise<Response> {
    const companies = await CompanyModel.find({ isDeleted: false }).populate([
      {
        path: 'units',
        select: { __v: 0, createdAt: 0, updatedAt: 0, company: 0 },
      },
      {
        path: 'employeers',
        select: { __v: 0, createdAt: 0, updatedAt: 0, company: 0 },
      },
    ]);

    return response.json({ companies });
  }
}

export default CompanyController;
