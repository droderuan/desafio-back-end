import { Schema, model, Document } from 'mongoose';

export interface IUserDoc extends Document {
  name: string;
  email: string;
  company: string;
  responsibleAssets: string[];
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    responsibleAssets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  },
  { timestamps: true },
);

export default model<IUserDoc>('User', UserSchema);
