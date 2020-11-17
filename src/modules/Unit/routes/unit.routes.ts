import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UnitController from '../controllers/UnitController';

const unitController = new UnitController();

const unitRoutes = Router();

unitRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  unitController.index,
);

unitRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      companyId: Joi.string().required(),
    },
  }),
  unitController.create,
);

unitRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  unitController.update,
);

unitRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  unitController.delete,
);

export default unitRoutes;
