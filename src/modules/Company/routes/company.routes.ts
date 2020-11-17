import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import Companycontroller from '../controllers/CompanyController';

const companyController = new Companycontroller();

const companyRoutes = Router();

companyRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  companyController.index,
);

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

companyRoutes.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      companyId: Joi.string().required(),
    },
  }),
  companyController.delete,
);

export default companyRoutes;
