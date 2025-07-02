import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactFormValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().regex(emailRegex, 'Enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
}).strip();
