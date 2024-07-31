import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../services/authToken';
import { Register } from '../services';
import { errorResponse, successResponse } from '../utils/responseHandler';
import { Login } from '../services/Login';

export const register = async (req: Request, res: Response) => {
    try {
      let {
        email,
        password,
        name,
        } = req.body;
      
      email = email ? email.toString().toLowerCase().trim() : '';
  
      let response = await Register(
        {
          email,
          password,
          name: name?.trim(),
          }
      );
  
      return successResponse(res, 201, "signed up", response.user);
    } catch (error: any) {
      return errorResponse(res, 500, error.message);
    }
  };

  export const login = async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
  
      email = email ? email.toString().toLowerCase().trim() : '';
  
      
      const response = await Login(email, password);
  
      if (response.error) {
        return errorResponse(res, 400, response.message);
      }
  
      return successResponse(res, 200, "login successful details", response.data);
    } catch (error: any) {
      return errorResponse(res, 500, error.message);
    }
  };
  