import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  formId: mongoose.Types.ObjectId;
  data: object;
  files: string[];
  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  data: { type: Schema.Types.Mixed, required: true },
  files: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);