import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/multer/Upload';

import AssetController from '../controllers/AssetController';
import ImageAssetController from '../controllers/ImageAssetController';

const assetController = new AssetController();
const imageAssetController = new ImageAssetController();

const upload = multer(uploadConfig.multer);

const assetRoutes = Router();

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
      responsibleId: Joi.string(),
      unitId: Joi.string().required(),
    },
  }),
  assetController.create,
);

assetRoutes.put(
  '/:assetId',
  celebrate({
    [Segments.PARAMS]: {
      assetId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      modelName: Joi.string().required(),
      state: Joi.string()
        .valid('Disponível', 'Em manutenção', 'Desativado')
        .required(),
      healthscore: Joi.number().integer().max(100).required(),
      unitId: Joi.string().required(),
    },
  }),
  assetController.update,
);

assetRoutes.delete(
  '/:assetId/',
  celebrate({
    [Segments.PARAMS]: {
      assetId: Joi.string().required(),
    },
    [Segments.BODY]: {
      unitId: Joi.string(),
    },
  }),
  assetController.delete,
);

assetRoutes.patch(
  '/:assetId/image',
  celebrate({
    [Segments.PARAMS]: {
      assetId: Joi.string().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().default(''),
    },
  }),
  upload.single('image'),
  imageAssetController.update,
);

assetRoutes.delete(
  '/:assetId/image',
  celebrate({
    [Segments.PARAMS]: {
      assetId: Joi.string().required(),
    },
  }),
  imageAssetController.delete,
);

export default assetRoutes;
