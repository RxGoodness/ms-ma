import { Router } from 'express';
import { createProduct, getProduct } from '../controllers/product.controller';
import authMiddleware from '../middlewares/middleware';

const router = Router();

router.post('/', authMiddleware, createProduct);
router.get('/:id', getProduct);

export default router;
