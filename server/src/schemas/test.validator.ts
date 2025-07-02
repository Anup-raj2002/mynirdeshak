import { z } from 'zod';

export const testValidationSchema = z.object({
  description: z.string().optional(),
  isPublished: z.boolean().default(false),
  sessionId: z.string().min(1, 'Session is required'),
  stream: z.enum(['PCM', 'PCB', 'PCMB', 'Commerce', 'Arts', 'Others']),
  sections: z.array(z.object({
    name: z.enum(['A', 'B', 'C', 'D']),
    questions: z.array(z.string()).optional(),
  })).optional(),
  startDateTime: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
}).strip();

export type TestInput = z.infer<typeof testValidationSchema>; 