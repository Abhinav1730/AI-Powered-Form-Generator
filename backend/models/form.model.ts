import mongoose, { Schema, Document } from 'mongoose';

export interface IForm extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  formSchema: Record<string, any>;
  createdAt: Date;
}

const FormSchema = new Schema<IForm>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  formSchema: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Form = mongoose.model<IForm>('Form', FormSchema);