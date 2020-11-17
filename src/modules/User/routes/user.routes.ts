import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/UserController';

const userController = new UserController();

const userRoutes = Router();

userRoutes.get(
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

export default userRoutes;
