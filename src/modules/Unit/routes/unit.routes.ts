import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UnitController from '../controllers/UnitController';

const unitController = new UnitController();

const unitRoutes = Router();

unitRoutes.get(
  '/:unitId',
  celebrate({
    [Segments.PARAMS]: {
      unitId: Joi.string().required(),
    },
  }),
  unitController.index,
);

unitRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  unitController.create,
);

unitRoutes.put(
  '/:unitId',
  celebrate({
    [Segments.PARAMS]: {
      unitId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  unitController.update,
);

unitRoutes.delete(
  '/:unitId',
  celebrate({
    [Segments.PARAMS]: {
      unitId: Joi.string().required(),
    },
  }),
  unitController.delete,
);

export default unitRoutes;
