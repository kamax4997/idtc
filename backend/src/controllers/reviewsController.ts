import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product, ProductDocument } from '../models/product';
import { Review } from '../models/review';
import { isValidObjectId } from 'mongoose';
import { HttpStatus, ErrorStatus } from '../utils/httpStatus';
import { check, validationResult } from 'express-validator';

export default {
  addReview: asyncHandler(async (req: Request, res: Response) => {
    if (!isValidObjectId(req.params.productId))
      throw new ErrorStatus('Product Not Found!');
      
    let product: ProductDocument = await Product.findById(
      req.params.productId
    );

    if (!product) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Product Not Found!' });
    }

    await check('rating', 'Rating is not valid')
      .isInt({ min: 1, max: 5 })
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: true, message: errors.array()[0].msg });

    const { rating, comment } = req.body;
    product.reviews.push(
      new Review({
        reviewer: req.params.reviewer,
        content: req.params.content,
        rating: req.params.rating,
      })
    );
    await product.save();
    product = await Product.populate(product, {
      path: 'reviews.ratedBy',
      select: 'name',
    });
    res.status(200).json(product);
  }),
};
