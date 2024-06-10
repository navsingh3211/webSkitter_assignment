import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
/**
 * Generate jwt token for user data
 * data: user data
 * cb: callback function
 */
export const generateToken = (data, cb) => {
  return jwt.sign({ data }, JWT_SECRET_KEY,{expiresIn: "15d"});
};