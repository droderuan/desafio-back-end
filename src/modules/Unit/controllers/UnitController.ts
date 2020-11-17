import { Request, Response } from 'express';
import CompanyModel from '@modules/Company/schemas/CompanyModel';

import UnitModel from '../schemas/UnitModel';

class UnitController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const unit = await UnitModel.findById(id);

    return response.json(unit);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, companyId } = request.body;

    const checkUnit = await UnitModel.findOne({ name });

    if (checkUnit) {
      return response.status(400).json({ error: 'Unit name already exist' });
    }

    const companyToUpdate = await CompanyModel.findById(companyId);

    if (!companyToUpdate) {
      return response.status(400).json({ error: 'Company does not exist' });
    }

    const unit = new UnitModel({ name, company: companyId });

    const savedUnit = await unit.save();

    companyToUpdate.units.push(savedUnit);

    await companyToUpdate.save();

    return response.json(savedUnit);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const unit = await UnitModel.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, useFindAndModify: false },
    );

    return response.json(unit);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const unit = await UnitModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, useFindAndModify: false },
    );

    return response.json(unit);
  }
}

export default UnitController;
