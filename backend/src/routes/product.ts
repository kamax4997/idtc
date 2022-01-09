import express from 'express';
const router = express.Router();

import ProductsController from '../controllers/productsController';

router.get('/', ProductsController.getProducts);

export default router;
