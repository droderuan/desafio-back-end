import { Router } from 'express';

import DashboardCompanyController from '../controllers/DashboardCompanyController';

const dashboardCompanyController = new DashboardCompanyController();

const dashboardCompanyRoutes = Router();

dashboardCompanyRoutes.get('/all', dashboardCompanyController.list);

export default dashboardCompanyRoutes;
