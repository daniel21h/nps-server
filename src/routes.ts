import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from "./controllers/AnswerController";
import { NPSController } from "./controllers/NPSController";

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

const sendMailController = new SendMailController();
const answerController = new AnswerController();

const npsController = new NPSController();

routes.post('/users', usersController.create);

routes.get('/surveys', surveysController.index);
routes.post('/surveys', surveysController.create);

routes.post('/sendMail', sendMailController.execute);

routes.get('/answers/:value', answerController.execute);

routes.get('/nps/:survey_id', npsController.execute);

export { routes };
