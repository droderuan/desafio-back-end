import { Request, Response } from 'express';

import CompanyModel from '../schemas/CompanyModel';

class CompanyController {
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
