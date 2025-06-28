import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITestAttempt extends Document {
    userId: Types.ObjectId;
    testId: Types.ObjectId;
    answers: {
      questionId: Types.ObjectId;
      selectedOption: number;
    }[];
    score: number;
    completedAt?: Date;
    rank?: number;
}

export const testAttemptSchema = new Schema<ITestAttempt>({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    answers: [{
        questionId: {
            type: Schema.Types.ObjectId, 
            ref: 'Question',
            required: true 
        },
        selectedOption: { type: Number, required: true },
    }],
    score: { type: Number, default: 0, min: 0},
    completedAt: Date,
    rank: { type: Number },
  },
  { timestamps: true }
);

testAttemptSchema.index({ testId: 1, userId: 1 });

testAttemptSchema.index({ testId: 1, score: -1, completedAt: 1 });

export const TestAttempt = mongoose.model<ITestAttempt>('TestAttempt', testAttemptSchema); 