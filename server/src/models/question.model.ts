import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestion extends Document {
  testId: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questionSchema = new Schema<IQuestion>({
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  question: { type: String, required: true, trim: true },
  options: { type: [String], required: true,
    validate: [(val: string[]) => val.length >= 2, 'At least two options is required'],
   },
  correctAnswer: { type: Number, 
    required: true,
    validate: {
      validator: function(val: number) {
        return this.options && val >= 0 && val < this.options.length;
      },
      message: 'Correct answer index must match options length.',
    },
  },
  }, {
    timestamps: true
  }
);

export const Question = mongoose.model<IQuestion>('Question', questionSchema);