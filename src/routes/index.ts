import express, { Router } from 'express';

import CompanyRoutes from '@modules/Company/routes/company.routes';
import DashboardCompanyRoutes from '@modules/Company/routes/dashboardCompany.routes';
import UnitRoutes from '@modules/Unit/routes/unit.routes';
import UserRoutes from '@modules/User/routes/user.routes';

const router = Router();

router.use(express.json());

router.use('/companies', CompanyRoutes);
router.use('/dashboard', DashboardCompanyRoutes);
router.use('/units', UnitRoutes);
router.use('/users', UserRoutes);

export default router;
