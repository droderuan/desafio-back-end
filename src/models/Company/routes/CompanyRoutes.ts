import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import Companycontroller from '../controllers/CompanyController';

const companyController = new Companycontroller();

const companyRoutes = Router();

companyRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  companyController.create,
);

companyRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  companyController.update,
);

export default companyRoutes;
