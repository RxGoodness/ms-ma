import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/MicroserviceConnections/AuthAPI';

interface ValidationResponse {
    valid: boolean;
    user?: { 
        _id: string;
        email: string;
       // password?: boolean;
       name: string; };
  }
  
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const validationResponse: ValidationResponse = await verifyToken(token);
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
