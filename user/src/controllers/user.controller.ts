import { Request, Response } from 'express';
import { UpdateUserById } from "../services/UserService/UpdateUser";
import { errorResponse, successResponse } from "../utils/responseHandler";

export const updateUser = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      let {
        name,
        } = req.body;
     
      // only super admin can make another user and admin
      
      const update: {name: string} = {
        name,
        };
      
     
      const response = await UpdateUserById(user._id, update);
  
      
      return successResponse(res, 200, "user updated", response.data);
    } catch (error: any) {
      return errorResponse(res, 500, error.message);
    }
  };
  