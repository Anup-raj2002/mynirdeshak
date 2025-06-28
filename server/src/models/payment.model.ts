import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITestPayment extends Document {
  userId: Types.ObjectId;
  testId: Types.ObjectId;
  amount: number;
  method: string;
  paymentId?: string;
  orderId?: string;
  createdAt: Date;
}

const testPaymentSchema = new Schema<ITestPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  paymentId: { type: String },
  orderId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

testPaymentSchema.index({ testId: 1, userId: 1 }, { unique: true });

export const TestPayment = mongoose.model<ITestPayment>('TestPayment', testPaymentSchema); 