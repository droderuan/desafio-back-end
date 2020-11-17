import { Request, Response } from 'express';
import CompanyModel from '@modules/Company/schemas/CompanyModel';

import AppError from '@errors/AppError';
import UnitModel from '../schemas/UnitModel';

class UnitController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { unitId } = request.params;

    const unit = await UnitModel.findById(unitId);

    return response.json(unit);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const companyId = request.company.id;

    const companyToUpdate = await CompanyModel.findById(companyId).populate({
      path: 'Unit',
      select: { name: 1 },
    });

    if (!companyToUpdate) {
      throw new AppError(`Company with ${companyId} does not exist`, 406);
    }

    const checkUnit = companyToUpdate.units.find(unit => unit.name === name);

    if (checkUnit) {
      return response.status(400).json({ error: 'Unit name already exist' });
    }

    const unit = new UnitModel({ name, company: companyId });

    const savedUnit = await unit.save();

    companyToUpdate.units.push(savedUnit);

    await companyToUpdate.save();

    return response.json(savedUnit);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { unitId } = request.params;

    const { name } = request.body;

    const unit = await UnitModel.findOneAndUpdate(
      { _id: unitId },
      { name },
      { new: true, useFindAndModify: false },
    );

    return response.json(unit);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { unitId } = request.params;

    const unit = await UnitModel.find({ _id: unitId });

    return response.json(unit);
  }
}

export default UnitController;
