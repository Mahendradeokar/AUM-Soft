import mongoose, { Schema } from 'mongoose';

export interface IRateCardModel {
  fsn_code: string;
  fulfillment_profile: ['NO_FBF', 'FBF'];
  commission: object;
  fixed_fee: object;
  collection_fee: object;
  shipping_fee: object;
  reverse_shipping_fee: object;
}
const RateCardSchema = new Schema({});

const RateCard = mongoose.models.session || mongoose.model<IRateCardModel>('rate_card', RateCardSchema);

export default RateCard;
