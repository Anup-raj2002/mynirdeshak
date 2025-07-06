import { Router } from 'express';
import { submitContactForm, submitRegistrationForm } from '../controllers/form.controller';
import { authenticate, authorize } from '../middleware/auth';

const formRouter = Router();

formRouter.post('/contact', submitContactForm);
formRouter.use(authenticate, authorize(['student']))
formRouter.post('/registration', submitRegistrationForm);

export default formRouter; 