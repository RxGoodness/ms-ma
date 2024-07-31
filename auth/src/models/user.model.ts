import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from "mongodb";

export interface IUser {
  email: string;
  password: string;
  name?: string
}
export interface IUserDocument extends IUser, Document {}

export interface IUserWithToken extends IUser, Pick<IUserDocument, "_id"> {
    access_token: string;
    email: string;
  }

  export interface ITokenPayload {
    _id: ObjectId | string;
    access_level: number;
    is_email_verified: boolean;
    verification_status?: string;
  }
  
  const userSchemaFields: Record<keyof IUser, any> = {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
};

const UserSchema: Schema = new Schema(userSchemaFields, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });
  
export default mongoose.model<IUserDocument>('User', UserSchema);
