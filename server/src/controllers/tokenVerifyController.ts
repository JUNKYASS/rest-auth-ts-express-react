import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

import { UnauthorizedError, CustomError } from '../utils/errors';
import { cookieProps } from '../utils/cookie';

dotenv.config();
const { OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;

const tokenVerifyController = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.signedCookies[cookieProps.key];

  // const data = await jwtUtil.decode(token);
  // if (!data || data.error) return res.status(BAD_REQUEST).json({ message: 'Token validation failed', error: data.error, success: false });



  // const data: any = undefined


  // if (!data || data.error) throw new Error('No token found');

  // return res.status(OK).json({ message: 'Token is valid', success: true, payload: data });

  // throw new UnauthorizedError();

  // console.log(a);

  // return res.status(BAD_REQUEST).json({ message: e instanceof Error ? e.message : e, error: e, success: false });
}

export default tokenVerifyController;