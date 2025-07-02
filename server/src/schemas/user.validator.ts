import { z } from 'zod';

export const UserRoles = ['student', 'instructor', 'test-manager', 'admin'] as const;
export type UserRole = (typeof UserRoles)[number];

export const baseUserValidationSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .trim(),
  photoUrl: z.string().optional(),
  contactNumber: z.string()
  .regex(/^(\+91|0)?[6-9]\d{9}$/, 'Invalid phone number format').optional(),
  dob: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  altPhone: z.string().optional(),
});

export const createUserValidationSchema = baseUserValidationSchema.extend({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(UserRoles, {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid role',
  }),
});

const studentDetailsValidationSchema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  fatherName: z.string().min(1, 'Father name is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  altPhone: z.string().min(1, 'Alternative phone is required'),
});

export const createStudentValidationSchema = createUserValidationSchema.merge(studentDetailsValidationSchema);

export const deleteStudentValidationSchema = z.object({
  profileUID: z.string().min(1, 'Profile UID is required'),
});

type CreateUser = z.infer<typeof createUserValidationSchema>;
type CreateStudent = z.infer<typeof createStudentValidationSchema>;

export type CreateUserInput = CreateUser | CreateStudent;
export type BaseUser = z.infer<typeof baseUserValidationSchema>;
export type DeleteStudent = z.infer<typeof deleteStudentValidationSchema>;
