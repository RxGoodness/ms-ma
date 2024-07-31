import { compare } from "bcryptjs";
import UserModel from "../models/user.model";
import { sign } from "jsonwebtoken";
import { config } from "../config/env";
const { JWT_SECRET } = config;

export const Login = async (
  email: string,
  password: string,
) => {
  const user: any = await UserModel.findOne({ email })
  const userExists = await UserModel.exists({email});
  
  if(userExists){
    return { error: true, message: "Invalid Credentials" };
  }

  if (!user.password || !(await compare(password, user.password))) {
    return { error: true, message: "Invalid Credentials" };
  }
   const access_token = sign(user, JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return { error: false, data: {access_token, ...user}, message: "success" };
};
