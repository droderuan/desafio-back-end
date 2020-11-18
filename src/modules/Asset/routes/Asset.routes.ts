import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AssetController from '../controllers/AssetController';

const assetController = new AssetController();

const assetRoutes = Router();

assetRoutes.get('/all', assetController.list);

assetRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      modelName: Joi.string().required(),
      state: Joi.string()
        .valid('Disponível', 'Em manutenção', 'Desativado')
        .required(),
      healthscore: Joi.number().integer().max(100).required(),
      responsibleId: Joi.string().required(),
      unitId: Joi.string().required(),
      companyId: Joi.string().required(),
    },
  }),
  assetController.create,
);

export default assetRoutes;
