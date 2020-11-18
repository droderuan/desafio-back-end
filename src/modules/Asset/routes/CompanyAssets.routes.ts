import { Router } from 'express';

import CompanyAssetsController from '../controllers/CompanyAssetsController';

const companyAssetsController = new CompanyAssetsController();

const companyAssetRoutes = Router();

companyAssetRoutes.get('/all', companyAssetsController.list);

export default companyAssetRoutes;
