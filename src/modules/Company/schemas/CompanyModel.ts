import { Schema, model, Document } from 'mongoose';

import { IUnitDoc } from '@modules/Unit/schemas/UnitModel';
import { IUserDoc } from '@modules/User/schemas/UserModel';

export interface ICompanyDoc extends Document {
  name: string;
  isDeleted: boolean;
  units: IUnitDoc[];
  employeers: IUserDoc[];
}

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    units: [{ type: Schema.Types.ObjectId, ref: 'Unit' }],
    employeers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default model<ICompanyDoc>('Company', companySchema);
