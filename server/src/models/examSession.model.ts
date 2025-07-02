import mongoose, { Schema, Document } from 'mongoose';

export interface IExamSession extends Document {
  year: string; // e.g., "2025-26"
  commonName: string; // e.g., "Mynirdeshak National Scholarship Exam 2025-26"
}

const examSessionSchema = new Schema<IExamSession>({
  year: { type: String, required: true, unique: true },
  commonName: { type: String, required: true },
});

export const ExamSession = mongoose.model<IExamSession>('ExamSession', examSessionSchema); 