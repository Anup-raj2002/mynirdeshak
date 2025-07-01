import { Router } from 'express';
import { submitContactForm, submitRegistrationForm } from '../controllers/form.controller';

const formRouter = Router();

formRouter.post('/contact', submitContactForm);
formRouter.post('/registration', submitRegistrationForm);

export default formRouter; 