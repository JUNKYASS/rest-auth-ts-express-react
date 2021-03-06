import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

import { CustomError } from '../utils/errors';
import { cookieProps } from '../utils/cookie';
import jwtUtil from '../utils/jwt';
import db from '../db';

dotenv.config();

const { OK, UNAUTHORIZED } = StatusCodes;

const tokenVerifyController = async (req: Request, res: Response, _: NextFunction) => {
  const token = req.signedCookies[cookieProps.key];
  if (!token) return res.status(OK).json({ message: 'Token doesn\'t exist', success: false });

  const savedToken = await db.getAuthToken(token); // Check token in our database
  if (!savedToken || !savedToken.token) return res.status(OK).json({ message: 'Token doesn\'t exist', success: false });

  const decodedData = await jwtUtil.decode(savedToken.token);
  if (!decodedData || decodedData.error) throw new CustomError('Token is not valid', UNAUTHORIZED);

  const user = await db.getUserByLoginOrEmail(decodedData.login);
  delete (user as any).password;
  delete (user as any).activation_id;

  return res.status(OK).json({ message: 'Token is valid', success: true, data: user });
};

export default tokenVerifyController;