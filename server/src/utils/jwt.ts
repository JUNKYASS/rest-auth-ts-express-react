import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const errors = { validation: 'JSON-web-token validation failed', };
const options = { expiresIn: process.env.COOKIE_EXP, };
const secret = process.env.JWT_SECRET || uuid();

const sign = (data: JwtPayload): Promise<string> => { // Encrypt data and return jwt
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(data, secret, options, (err, token) => {
      err ? reject(err) : resolve(token || '');
    });
  });
};

const decode = (jwt: string): Promise<JwtPayload | string | undefined> => { // Decrypt JWT and extract client data
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, secret, (err, decoded) => {
      return err ? rej({ error: errors.validation }) : res(decoded);
    });
  });
};

export default {
  sign,
  decode
}