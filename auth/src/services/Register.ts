import { hash } from "bcryptjs";
import { config } from "../config/env";
import { sign } from "jsonwebtoken";
import UserModel, {
  IUser,
} from "../models/user.model";
const { JWT_SECRET } = config;

export const Register = async (payload: IUser) => {
  
  const {
    email,
    password,
    name
  } = payload;

  const userExists = await UserModel.exists({email});
  if(userExists){
    return { error: true, message: "Email already taken" };
  }

  const hashedPassword = await hash(password, 10);
  
  const user: any = await UserModel.create({
    email,
    password: hashedPassword,
    name,
   });

   const access_token = sign(user, JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return {
    error: false,
    user: {access_token, ...user},
   };
};
