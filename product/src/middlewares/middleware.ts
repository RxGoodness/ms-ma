import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/rabbitmqService';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const validationResponse = await verifyToken(token);
    if (validationResponse.valid) {
      req.user = validationResponse.user;
      next();
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware;
