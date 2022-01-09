import mongoose from 'mongoose';
import { ProductDocument } from './product';

mongoose.Promise = global.Promise;

export type ReviewDocument = mongoose.Document & {
  reviewer: string;
  content?: string;
  rating: number;
};

export const ReviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  content: { type: String },
  rating: { type: Number, required: true },
});

const averageRatings = (reviews: ReviewDocument[]) => {
  return reviews.reduce((sum, val) => sum + val.rating, 0) / reviews.length;
};

ReviewSchema.pre('save', function (next) {
  // Calculate and update overall rating before save.
  const product = this as ProductDocument;
  product.overall = averageRatings(product.reviews);
  next();
});

export const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema);
