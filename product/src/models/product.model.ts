import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  ownerId: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ownerId: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
