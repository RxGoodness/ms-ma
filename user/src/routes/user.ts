import { Router } from 'express';
import { updateUser } from '../controllers/user.controller';
import authMiddleware from '../middlewares/middleware';

const router = Router();

router.put('/', authMiddleware, updateUser);
// router.get('/:id', getProduct);

export default router;
