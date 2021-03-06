import express, { Router } from 'express';

import CompanyRoutes from '@modules/Company/routes/company.routes';
import DashboardCompanyRoutes from '@modules/Company/routes/dashboardCompany.routes';
import UnitRoutes from '@modules/Unit/routes/unit.routes';
import UserRoutes from '@modules/User/routes/user.routes';
import AssetRoutes from '@modules/Asset/routes/Asset.routes';
import CompanyAssetRoutes from '@modules/Asset/routes/CompanyAssets.routes';
import ResponsibleAssetRoutes from '@modules/Asset/routes/ResponsibleAsset.routes';

import VerifyCompanyMiddleware from '../middlewares/VerifyCompany';

const router = Router();

router.use(express.json());

router.use('/company', CompanyRoutes);
router.use('/companies/dashboard', DashboardCompanyRoutes);
router.use('/company/:companyId/units', VerifyCompanyMiddleware, UnitRoutes);
router.use('/company/:companyId/users', VerifyCompanyMiddleware, UserRoutes);
router.use('/company/:companyId/assets', VerifyCompanyMiddleware, AssetRoutes);
router.use(
  '/company/:companyId/assets',
  VerifyCompanyMiddleware,
  CompanyAssetRoutes,
);
router.use(
  '/company/:companyId/assets',
  VerifyCompanyMiddleware,
  ResponsibleAssetRoutes,
);

export default router;
