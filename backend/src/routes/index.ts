import express from 'express';
import ProductRoute from './product';
import ReviewRoute from './review';
const router = express.Router();
router.use('/products', ProductRoute);
router.use('/reviews', ReviewRoute);

export { router as Router };
