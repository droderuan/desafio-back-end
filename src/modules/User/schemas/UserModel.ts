import { Schema, model } from 'mongoose';

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
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true },
);

export default model('User', UserSchema);
