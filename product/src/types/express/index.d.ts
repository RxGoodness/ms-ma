// import { IUserAuthInfoRequest } from "../../interface";
export interface IUserAuthInfoRequest {
  _id: string;
   email: string;
  // password?: boolean;
  name: string;
}

declare global {
  export namespace Express {
    interface Request {
      user: IUserAuthInfoRequest;
    }
  }
}
