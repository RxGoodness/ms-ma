import { Router } from 'express';
import { createProduct, getProduct } from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createProduct);
router.get('/:id', getProduct);

export default router;
