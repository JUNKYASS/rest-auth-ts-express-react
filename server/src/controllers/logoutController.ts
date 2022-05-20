import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import { cookieProps } from '../utils/cookie';
import db from '../db';

dotenv.config();

const { OK } = StatusCodes;

const logoutController = async (req: Request, res: Response, _: NextFunction) => {
  const token = req.signedCookies[cookieProps.key];
  await db.deleteAuthToken(token);

  res.clearCookie(process.env.COOKIE_SECRET!);

  res.status(OK).json({ message: 'You have been logged out', success: true });
};

export default logoutController;