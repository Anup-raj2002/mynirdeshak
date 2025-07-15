import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { AppError } from '../middleware/errorHandler';
import { config } from '../config/variables.config';
import { contactFormValidationSchema } from '../schemas/contactForm.validator';
import { fullRegistrationFormValidationSchema } from '../schemas/registrationForm.validator';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/user.model';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contactFormValidationSchema.parseAsync(req.body);
    const validatedData = result;

    const scriptURL = config.contactScriptUrl;
    const verificationCode = config.scriptVerificationCode;

    if (!scriptURL || !verificationCode) {
      throw new AppError('Contact form service not configured', 500);
    }
    if(config.nodeEnv === 'production'){
      await axios.post(`${scriptURL}?verificationCode=${verificationCode}`, validatedData);
    }
    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    next(error);
  }
};

export const submitRegistrationForm = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await fullRegistrationFormValidationSchema.parseAsync(req.body);
    const {acknowledgment, allDetailsCorrect, ...validatedData} = result;

    const scriptURL = config.registrationScriptUrl;
    const verificationCode = config.scriptVerificationCode;

    await User.findOneAndUpdate({uid: req.user?.uid}, {
      stream: validatedData.stream,
      motherName: validatedData.motherName,
      fatherName: validatedData.fatherName,
      altPhone: validatedData.altPhone,
      contactNumber: validatedData.phone,
      dob: validatedData.dob
    });

    if (!scriptURL || !verificationCode) {
      throw new AppError('Registration form service not configured', 500);
    }
    if(config.nodeEnv === 'production'){
      await axios.post(`${scriptURL}?verificationCode=${verificationCode}`, validatedData);
    }
    res.status(200).json({
      success: true,
      message: 'Registration submitted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 