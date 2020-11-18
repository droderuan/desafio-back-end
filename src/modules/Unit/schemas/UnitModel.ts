import { Schema, model, Document } from 'mongoose';

import { ICompanyModel } from '@modules/Company/schemas/CompanyModel';
import { IAssetModel } from '@modules/Asset/Schemas/AssetModel';

export interface IUnitModel extends Document {
  name: string;
  company: ICompanyModel;
  assets: IAssetModel[];
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

unitSchema.pre<IUnitModel>('remove', async function (this: IUnitModel) {
  await this.model('Company').findOneAndUpdate(
    { _id: this.company },
    { $pull: { units: this._id } },
  );
});

export default model<IUnitModel>('Unit', unitSchema);
