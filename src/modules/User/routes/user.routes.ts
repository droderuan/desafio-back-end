import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/UserController';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      companyId: Joi.string().required(),
    },
  }),
  userController.create,
);

userRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  userController.update,
);

userRoutes.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
    },
  }),
  userController.delete,
);

export default userRoutes;
