import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResponsibleAssetController from '../controllers/ResponsibleAssetController';

const responsibleAssetController = new ResponsibleAssetController();

const assetRoutes = Router();

assetRoutes.patch(
  '/:assetId/responsible',
  celebrate({
    [Segments.PARAMS]: {
      assetId: Joi.string().required(),
    },
    [Segments.BODY]: {
      responsibleId: Joi.string().required(),
    },
  }),
  responsibleAssetController.patch,
);

export default assetRoutes;
