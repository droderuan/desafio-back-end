import { Schema, model, Document } from 'mongoose';

import { IUnitModel } from '@modules/Unit/schemas/UnitModel';
import { IUserModel } from '@modules/User/schemas/UserModel';

export interface ICompanyModel extends Document {
  name: string;
  isDeleted: boolean;
  units: IUnitModel[];
  employeers: IUserModel[];
}

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

export default model<ICompanyModel>('Company', companySchema);
