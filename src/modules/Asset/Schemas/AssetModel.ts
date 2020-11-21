import { Schema, model, Document } from 'mongoose';

import { IUserModel } from '@modules/User/schemas/UserModel';
import { IUnitModel } from '@modules/Unit/schemas/UnitModel';
import randomNumber from '../../../utils/randomNumber';

export interface IAssetModel extends Document {
  name: string;
  description: string;
  type: string;
  modelName: string;
  state: string;
  healthscore: number;
  responsible: IUserModel;
  company: string;
  unit: IUnitModel;
  image: {
    name: string;
    description: string;
    url: string | null;
  };
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

assetSchema.set('toObject', { virtuals: true });
assetSchema.set('toJSON', { virtuals: true });

assetSchema.virtual('avgDecreaseHealthScore').get(function (this: IAssetModel) {
  return randomNumber(0, 5);
});

assetSchema.pre<IAssetModel>('save', async function (this: IAssetModel) {
  this.image.url = this.image.name
    ? `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${this.image.name}`
    : null;
  this.healthscore = randomNumber(55, 100);
});

assetSchema.pre<IAssetModel>('remove', async function (this: IAssetModel) {
  await this.model('User').findOneAndUpdate(
    { _id: this.responsible },
    { $pull: { responsibleAssets: this._id } },
  );
});

export default model<IAssetModel>('Asset', assetSchema);
