import { Router } from 'express';

import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveyController';

const routes = Router();

routes.post('/user', UserController.store);

routes.get('/survey', SurveyController.index);
routes.post('/survey', SurveyController.store);

export default routes;
