import {z} from 'zod';

export const testAttemptValidationSchema = z.object({
    answers: z.array(z.object({
      questionId: z.string().min(1, 'Question id is required'),
      selectedOption: z.number().int().min(0),
      optionMap: z.array(z.number().int()).min(4, 'Option map is required and must have options'),
    })).min(1, 'At least one answer is required'),
  }).strip();
  
  export type TestAttemptInput = z.infer<typeof testAttemptValidationSchema>;
  