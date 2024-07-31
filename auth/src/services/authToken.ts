import { config } from "../config/env";
import { sign, verify } from "jsonwebtoken";
const { JWT_SECRET } = config;

export const generateToken = (userId: string) => {
  return sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const validateToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
