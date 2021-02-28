import { Router } from 'express';

import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveyController';
import SendMailController from './controllers/SendMailController';

const routes = Router();

routes.post('/user', UserController.store);

routes.get('/survey', SurveyController.index);
routes.post('/survey', SurveyController.store);

routes.post('/send-mail', SendMailController.execute);

export default routes;
