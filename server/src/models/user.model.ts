import mongoose, { Document, Schema } from 'mongoose';
import { UserRole, UserRoles } from '../schemas/user.validator';
import { auth } from '../config/firebase.config';

export type IUser = Document & {
  uid: string;
  name?: string;
  photoUrl?: string;
  role: UserRole;
  contactNumber?: string;
  dob?: string;
  fatherName?: string;
  motherName?: string;
  altPhone?: string;
};

export const mongooseUserSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, trim: false },
    photoUrl: { type: String },
    role: { type: String, enum: UserRoles, required: true },
    contactNumber: {
      type: String,
      validate: {
        validator: (value: string) => /^\+?[1-9]\d{1,14}$/.test(value),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    dob: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    altPhone: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mongooseUserSchema.index({ role: 1 });
mongooseUserSchema.index({ name: 'text' });

mongooseUserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const user = this as IUser;
  try {
    if (user.uid) {
      try {
        await auth.deleteUser(user.uid);
      } catch (firebaseError: any) {
        if (firebaseError.code !== 'auth/user-not-found') {
          return next(firebaseError);
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model<IUser>('User', mongooseUserSchema);