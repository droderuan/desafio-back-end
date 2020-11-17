import { Request, Response, NextFunction } from 'express';

import CompanyModel from '@modules/Company/schemas/CompanyModel';
import AppError from '@errors/AppError';

export default async function VerifyCompany(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { companyId } = request.params;

  const checkCompany = await CompanyModel.findById(companyId);

  if (!checkCompany) {
    throw new AppError(
      `The company with id ${companyId} did not match any company. Check the ID.`,
      400,
    );
  }

  request.company = {
    id: companyId,
  };

  return next();
}
