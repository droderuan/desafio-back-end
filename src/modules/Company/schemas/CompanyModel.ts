import { Schema, model, Document } from 'mongoose';

import { IUnitDoc } from '@modules/Unit/schemas/UnitModel';

export interface ICompanyDoc extends Document {
  name: string;
  units: IUnitDoc[];
}

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    units: [{ type: Schema.Types.ObjectId, ref: 'Unit' }],
    employeers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default model<ICompanyDoc>('Company', companySchema);
