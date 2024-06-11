import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {response} from "./commonResponse.js";
import MESSAGES from "./commonMessage.js";
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

let verifyToken = (token, cb) => {
  try {
    let data = jwt.verify(token, JWT_SECRET_KEY);
    cb(null, data);
  } catch (error) {
    cb(error, null);
  }
};
export const validateToken = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (token && typeof token !== 'undefined') {
    verifyToken(token, async (err, data) => {
      if (err) {
        return res
          .status(401)
          .json(await response(false, MESSAGES.INVALID_TOKEN, 401));
      }
      req.token = token;
      req.authData = data;
      next();
    });
  } else {
    return res
      .status(401)
      .json(await response(false, MESSAGES.INVALID_TOKEN, 401));
  }
};
