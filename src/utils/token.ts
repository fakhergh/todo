import { sign, verify } from 'jsonwebtoken';

const options = { expiresIn: '7days' };

export const generateToken = (payload: any) =>
  sign(payload, process.env.JWT_KEY, options);

export const ensureToken = (token: string) =>
  verify(token, process.env.JWT_KEY);
