import { Router } from 'express';

import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveyController';
import SendMailController from './controllers/SendMailController';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NpsController';

const routes = Router();

routes.post('/user', UserController.store);

routes.get('/survey', SurveyController.index);
routes.post('/survey', SurveyController.store);

routes.post('/send-mail', SendMailController.execute);

routes.get('/answer/:value', AnswerController.execute);

routes.get('/nps/:survey_id', NpsController.execute);

export default routes;
