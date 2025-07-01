import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller';

const formRouter = Router();

formRouter.post('/contact', submitContactForm);
formRouter.post('/registration', submitContactForm);

export default formRouter; 