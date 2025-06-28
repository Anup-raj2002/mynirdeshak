import { z } from 'zod';

export const testValidationSchema = z.object({
  name: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => {
      if (typeof val === 'string') return parseInt(val);
      return val;
    },
    z.number().int().min(0)
  ),
  isPublished: z.boolean().default(false),
  questions: z.string().optional(),
  startDateTime: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  endDateTime: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
});

export type TestInput = z.infer<typeof testValidationSchema>; 