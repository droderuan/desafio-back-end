import { Schema, model, Document } from 'mongoose';

import { ICompanyModel } from '@modules/Company/schemas/CompanyModel';
import { IAssetModel } from '@modules/Asset/Schemas/AssetModel';

export interface IUserModel extends Document {
  name: string;
  email: string;
  company: ICompanyModel;
  responsibleAssets: IAssetModel[];
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nextMaintanceDate: Date,
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    responsibleAssets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  },
  { timestamps: true },
);

UserSchema.pre<IUserModel>('remove', async function (this: IUserModel) {
  await this.model('Company').findOneAndUpdate(
    { _id: this.company },
    { $pull: { employeers: this._id } },
  );

  await this.model('Asset').updateMany(
    { _id: { $in: this.responsibleAssets } },
    { responsible: null },
  );
});

export default model<IUserModel>('User', UserSchema);
