import express, { Router } from 'express';

import CompanyRoutes from '@modules/Company/routes/company.routes';
import DashboardCompanyRoutes from '@modules/Company/routes/dashboardCompany.routes';
import UnitRoutes from '@modules/Unit/routes/unit.routes';
import UserRoutes from '@modules/User/routes/user.routes';

import VerifyCompanyMiddleware from '../middlewares/VerifyCompany';

const router = Router();

router.use(express.json());

router.use('/companies', CompanyRoutes);
router.use('/company/dashboard', DashboardCompanyRoutes);
router.use('/company/:companyId/units', VerifyCompanyMiddleware, UnitRoutes);
router.use('/company/:companyId/users', VerifyCompanyMiddleware, UserRoutes);

export default router;
