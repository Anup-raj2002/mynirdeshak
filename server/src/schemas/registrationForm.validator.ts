import { z } from 'zod';

// Regexes from frontend
const phoneRegex = /^[6-9]\d{9}$/;
const pinCodeRegex = /^[1-9][0-9]{5}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registrationFormValidationSchema = z.object({
  // Step 1: Personal Details
  name: z.string().min(1, 'Name is required'),
  fatherName: z.string().min(1, 'Father name is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().regex(emailRegex, 'Enter a valid email address'),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit phone number starting with 6-9'),
  altPhone: z.string().regex(phoneRegex, 'Enter a valid 10-digit phone number starting with 6-9').optional().or(z.literal('')),
  fatherEmail: z.string().regex(emailRegex, 'Enter a valid email address'),

  // Step 2: Family & Socio-Economic
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  combinedIncome: z.string().min(1, 'Combined income is required'),
  category: z.string().min(1, 'Category is required'),
  otherScholarship: z.string().min(1, 'Please select if you receive other scholarship'),
  otherScholarshipDetails: z.string().optional().or(z.literal('')),

  // Step 3: Career & Academic
  careerGoal: z.string().min(1, 'Career goal is required'),
  careerGoalOther: z.string().optional().or(z.literal('')),
  classPassed: z.string().min(1, 'Class passed is required'),
  yearOfPassing: z.string().min(1, 'Year of passing is required'),
  board: z.string().min(1, 'Board is required'),
  school: z.string().min(1, 'School is required'),
  stream: z.string().min(1, 'Stream is required'),

  // Step 4: Address
  address: z.string().min(1, 'Address is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pinCode: z.string().regex(pinCodeRegex, 'Enter a valid 6-digit pin code (not starting with 0)'),

  // Step 5: Uploads (base64 strings)
  passportPhoto: z.string().min(1, 'Passport photo is required'),
  signaturePhoto: z.string().min(1, 'Signature photo is required'),
  idProofPhoto: z.string().min(1, 'ID proof photo is required'),
  schoolIdPhoto: z.string().min(1, 'School ID photo is required'),
  marksheet10Photo: z.string().min(1, '10th marksheet photo is required'),
  marksheet12Photo: z.string().optional().or(z.literal('')),

  // Step 6: Other Info
  howDidYouHear: z.string().min(1, 'This field is required'),
  scholarshipReason: z.string().min(1, 'This field is required'),
  disability: z.string().min(1, 'Please select disability status'),

  // Step 7: Declaration
  allDetailsCorrect: z.boolean().refine(val => val, { message: 'You must confirm details are correct' }),
  acknowledgment: z.boolean().refine(val => val, { message: 'You must acknowledge the rules' }),
});

export const fullRegistrationFormValidationSchema = registrationFormValidationSchema.superRefine((data, ctx) => {
  if (data.classPassed === '12' && !data.marksheet12Photo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['marksheet12Photo'],
      message: '12th marksheet photo is required',
    });
  }
  if (data.otherScholarship === 'yes' && !data.otherScholarshipDetails) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['otherScholarshipDetails'],
      message: 'Please provide details',
    });
  }
  if (data.careerGoal === 'other' && !data.careerGoalOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['careerGoalOther'],
      message: 'Please specify other career goal',
    });
  }
}); 