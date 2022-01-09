import express from 'express';
const router = express.Router();

import ReviewsController from 'controllers/reviewsController';

router.post('/', ReviewsController.addReview);

export default router;
