import {z} from 'zod';

export const questionValidationSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    options: z.array(z.string().min(1)).min(2, 'At least two options are required'),
    correctAnswer: z.number().int(),
  }).strip().refine((data) => {
    return data.correctAnswer >= 0 && data.correctAnswer < data.options.length;
  }, {
    message: 'Correct answer index must match one of the options',
    path: ['correctAnswer'],
  });
  
 export type QuestionInput = z.infer<typeof questionValidationSchema>;