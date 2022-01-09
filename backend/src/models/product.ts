import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export type ProductDocument = mongoose.Document & {
  name: string;
  description: string;
  img?: string;
  overall: number;
  link?: string;
}

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String, required: true },
  overall: { type: Number, required: true },
  link: { type: String },
});

export const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
