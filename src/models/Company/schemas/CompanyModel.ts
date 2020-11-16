import { Schema, model } from 'mongoose';

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model('companies', companySchema);
