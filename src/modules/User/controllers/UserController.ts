import { Request, Response } from 'express';

import UserModel from '../schemas/UserModel';

interface IRequest {
  name: string;
  email: string;
  companyId: string;
}

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, companyId } = <IRequest>request.body;

    const newUser = new UserModel({ name, email, companyId });

    newUser.save();

    return response.json(newUser);
  }
}

export default UserController;
