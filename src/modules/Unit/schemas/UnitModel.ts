import { Schema, model, Document } from 'mongoose';

import { ICompanyModel } from '@modules/Company/schemas/CompanyModel';
import { IAssetModel } from '@modules/Asset/Schemas/AssetModel';

export interface IUnitModel extends Document {
  name: string;
  countAssets: number;
  inUse: number;
  underMaintenance: number;
  disable: number;
  onAlert: number;
  onCritical: number;
  nextMaintenanceAssetSchedule: Date;
  company: ICompanyModel;
  assets: IAssetModel[];
  removeAsset(this: IUnitModel, assetId: string): void;
}

const unitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  },
  { timestamps: true },
);

unitSchema.set('toObject', { virtuals: true });
unitSchema.set('toJSON', { virtuals: true });

unitSchema.virtual('countAssets').get(function (this: IUnitModel) {
  return this.assets.length;
});

unitSchema.virtual('inUser').get(function (this: IUnitModel) {
  return this.assets.reduce(
    (total, asset) => (asset.state === 'Disponível' ? total + 1 : total),
    0,
  );
});

unitSchema.virtual('underMaintenance').get(function (this: IUnitModel) {
  return this.assets.reduce(
    (total, asset) => (asset.state === 'Em manutenção' ? total + 1 : total),
    0,
  );
});

unitSchema.virtual('disable').get(function (this: IUnitModel) {
  return this.assets.reduce(
    (total, asset) => (asset.state === 'Desativado' ? total + 1 : total),
    0,
  );
});

unitSchema.virtual('onAlert').get(function (this: IUnitModel) {
  return this.assets.reduce(
    (total, asset) =>
      asset.healthscore > 60 && asset.healthscore < 80 ? total + 1 : total,
    0,
  );
});

unitSchema.virtual('onCritical').get(function (this: IUnitModel) {
  return this.assets.reduce(
    (total, asset) => (asset.healthscore < 60 ? total + 1 : total),
    0,
  );
});

unitSchema.pre<IUnitModel>('remove', async function (this: IUnitModel) {
  await this.model('Company').findOneAndUpdate(
    { _id: this.company },
    { $pull: { units: this._id } },
  );
});

unitSchema.methods.removeAsset = async function (
  this: IUnitModel,
  assetId: string,
) {
  this.assets = this.assets.filter(asset => asset.id !== assetId);
  await this.save();
};

export default model<IUnitModel>('Unit', unitSchema);
