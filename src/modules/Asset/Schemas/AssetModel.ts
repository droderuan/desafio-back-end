import { Schema, model, Document } from 'mongoose';

import { IUserModel } from '@modules/User/schemas/UserModel';
import { IUnitModel } from '@modules/Unit/schemas/UnitModel';

export interface IAssetModel extends Document {
  name: string;
  description: string;
  type: string;
  modelName: string;
  state: string;
  healthScore: number;
  responsible: IUserModel;
  company: string;
  unit: IUnitModel;
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
    type: {
      type: String,
      required: true,
    },
    modelName: {
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
      description: String,
      url: {
        type: String,
        default: null,
      },
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', default: null },
    responsible: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

export default model<IAssetModel>('Asset', assetSchema);
