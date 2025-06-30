import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITest extends Document {
  instructorId: Types.ObjectId;
  name: string;
  description: string;
  isPublished: boolean;
  questions?: Types.ObjectId[];
  startDateTime: Date;
  endDateTime: Date;
  registration?: number;
  registrationEndDateTime: Date;
  price: number;
}

export const testSchema = new Schema<ITest>({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true, trim: true },
  description: {type: String, required: true, trim: true},
  isPublished: { type: Boolean, default: false },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  registration: { type: Number, required: false },
  registrationEndDateTime: { type: Date, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

testSchema.index({ instructorId: 1 });
testSchema.index({ endDateTime: 1 });
testSchema.index({ startDateTime: 1 });
testSchema.index({ isPublished: 1 });

export const Test = mongoose.model<ITest>('Test', testSchema); 