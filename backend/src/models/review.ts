import mongoose from 'mongoose';
import { ProductDocument, ProductSchema, Product } from './product';

mongoose.Promise = global.Promise;

export type ReviewDocument = mongoose.Document & {
  productId: mongoose.Schema.Types.ObjectId;
  reviewer: string;
  content?: string;
  rating: number;
};

export const ReviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  reviewer: { type: String, required: true },
  content: { type: String },
  rating: { type: Number, required: true },
});

const averageRatings = (reviews: ReviewDocument[], rating: number) => {
  let sum = rating;
  reviews.map((review) => {
    sum += review.rating;
  });

  return sum / reviews.length;
};

ReviewSchema.pre('save', async function (next) {
  // Calculate and update overall rating before save.
  const productId = this.get('productId')
  const rating = this.get('rating')
  const productCollection = Product.collection;
  const reviews = await Review.find({ productId });
  const overall = reviews.length > 0 ? averageRatings(reviews, rating) : rating;
  productCollection.findOneAndUpdate({ _id: productId }, { $set: { overall: overall }})
  next();
});

export const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema);
