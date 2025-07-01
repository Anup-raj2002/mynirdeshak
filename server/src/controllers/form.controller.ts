import { Request, Response } from 'express';
import axios from 'axios';
import { AppError } from '../middleware/errorHandler';
import { config } from '../config/variables.config';
import { contactFormValidationSchema } from '../schemas/contactForm.validator';
import { fullRegistrationFormValidationSchema } from '../schemas/registrationForm.validator';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const result = contactFormValidationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact form data',
        errors: result.error.flatten(),
      });
    }
    const validatedData = result.data;

    const scriptURL = config.contactScriptUrl;
    const verificationCode = config.scriptVerificationCode;

    if (!scriptURL || !verificationCode) {
      throw new AppError('Contact form service not configured', 500);
    }

    await axios.post(`${scriptURL}?verificationCode=${verificationCode}`, validatedData);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to send message', 500);
  }
};

export const submitRegistrationForm = async (req: Request, res: Response) => {
  try {
    const result = fullRegistrationFormValidationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration data',
        errors: result.error.flatten(),
      });
    }
    const {acknowledgment, allDetailsCorrect, ...validatedData} = result.data;

    const scriptURL = config.registrationScriptUrl;
    const verificationCode = config.scriptVerificationCode;

    if (!scriptURL || !verificationCode) {
      throw new AppError('Registration form service not configured', 500);
    }

    await axios.post(`${scriptURL}?verificationCode=${verificationCode}`, validatedData);
    return res.status(200).json({
      success: true,
      message: 'Registration submitted successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to submit registration', 500);
  }
}; 