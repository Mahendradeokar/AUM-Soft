import mongoose, { Schema } from 'mongoose';

export interface ICredentials {
  api_key: string;
  secret: string;
}
export interface IUserModel {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  user_credentials: [ICredentials];
  created_at: string;
  updated_at: string;
  deleted_at: string;
  created_by: string;
  updated_by: string;
  deleted_by: string;
}
const userSchema = new Schema({
  user_id: { type: String },
  user_name: { type: String },
  email: { type: String },
  password: { type: String },
  user_credentials: { type: Array },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String, default: false },
  created_by: { type: String },
  updated_by: { type: String },
  deleted_by: { type: String },
});
const User = mongoose.models.User || mongoose.model<IUserModel>('User', userSchema);

export default User;
