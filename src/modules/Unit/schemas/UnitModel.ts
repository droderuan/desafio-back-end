import { Schema, model, Document } from 'mongoose';

import { ICompanyDoc } from '@modules/Company/schemas/CompanyModel';

export interface IUnitDoc extends Document {
  name: string;
  company: ICompanyDoc;
  isDeleted: boolean;
}

const unitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

unitSchema.pre<IUnitDoc>('remove', async function (this: IUnitDoc) {
  await this.model('Company').findOneAndUpdate(
    { _id: this.company },
    { $pull: { units: this._id } },
  );
});

export default model<IUnitDoc>('Unit', unitSchema);
