import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITest extends Document {
  instructorId: Types.ObjectId;
  description: string;
  isPublished: boolean;
  sessionId: Types.ObjectId; // ref to ExamSession
  stream: 'PCM' | 'PCB' | 'PCMB' | 'Commerce' | 'Arts' | 'Others';
  sections: {
    name: "A" | "B" | "C" | "D";
    questions: Types.ObjectId[];
  }[];
  startDateTime: Date;
}

export const testSchema = new Schema<ITest>({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {type: String, required: true, trim: true},
  isPublished: { type: Boolean, default: false },
  sessionId: { type: Schema.Types.ObjectId, ref: 'ExamSession', required: true },
  stream: { type: String, enum: ['PCM', 'PCB', 'PCMB', 'Commerce', 'Arts', 'Others'], required: true },
  sections: [{
    name: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  }],
  startDateTime: { type: Date, required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

testSchema.index({ instructorId: 1 });
testSchema.index({ sessionId: 1 });
testSchema.index({ stream: 1 });
testSchema.index({ startDateTime: 1 });
testSchema.index({ isPublished: 1 });

export const Test = mongoose.model<ITest>('Test', testSchema); 