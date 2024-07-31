import jwt from 'jsonwebtoken';

const secretKey = 'yourSecretKey'; // Should be stored in environment variables

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
