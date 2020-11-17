import { Request, Response } from 'express';

import CompanyModel from '../schemas/CompanyModel';

class CompanyController {
  public async list(request: Request, response: Response): Promise<Response> {
    const companies = await CompanyModel.find({ isDeleted: false });

    return response.json({ companies });
  }
}

export default CompanyController;
