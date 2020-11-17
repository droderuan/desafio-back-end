import express, { Router } from 'express';

import CompanyRoutes from '@modules/Company/routes/CompanyRoutes';
import UnitRoutes from '@modules/Unit/routes/UnitRoutes';

const router = Router();

router.use(express.json());

router.use('/companies', CompanyRoutes);
router.use('/units', UnitRoutes);

export default router;
