import { Request, Response } from 'express';
import AppError from '@errors/AppError';

import CompanyModel from '@modules/Company/schemas/CompanyModel';
import UserModel from '../schemas/UserModel';

interface IRequest {
  name: string;
  email: string;
  companyId: string;
}

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = <IRequest>request.body;

    const companyId = request.company.id;

    const company = await CompanyModel.findById(companyId);

    if (!company) {
      throw new AppError(`Company with ${companyId} does not exist`, 406);
    }

    const newUser = new UserModel({ name, email, company: companyId });

    company.employeers.push(newUser);

    newUser.save();
    company.save();

    return response.json(newUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const { name, email } = <IRequest>request.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name, email },
      { new: true, useFindAndModify: false },
    );

    return response.json(updatedUser);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    user.remove();

    return response.status(204).json();
  }
}

export default UserController;
