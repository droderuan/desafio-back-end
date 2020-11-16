import express, { Router } from 'express';

import CompanyRoutes from '../models/Company/routes/CompanyRoutes';

const router = Router();

router.use(express.json());

router.use('/companies', CompanyRoutes);

export default router;
