import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/product';
import { HttpStatus } from '../utils/httpStatus';

export default {
  getProducts: asyncHandler(async (req: Request, res: Response) => {
    try {
      const products = await Product.find({});
      res.status(HttpStatus.OK).json({ products });
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }),
};
