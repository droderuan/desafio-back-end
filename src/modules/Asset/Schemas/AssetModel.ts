import { Schema, model, Document } from 'mongoose';

import { ICompanyDoc } from '@modules/Company/schemas/CompanyModel';

import { IUnitDoc } from '@modules/Unit/schemas/UnitModel';

export interface IAssetDoc extends Document {
  name: string;
  company: ICompanyDoc;
  unit: IUnitDoc;
}

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 600,
    },
    model: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    healthscore: {
      type: Number,
      required: true,
    },
    image: {
      name: String,
      url: {
        type: String,
        default: null,
      },
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
    responsible: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

export default model<IAssetDoc>('Asset', assetSchema);
