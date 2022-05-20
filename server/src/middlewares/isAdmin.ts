import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import jwtUtil from '../utils/jwt';
import { cookieProps } from '../utils/cookie';
import { CustomError } from '../utils/errors';

const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = 'JWT not present in signed cookie.';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const jwt = req.signedCookies[cookieProps.key];
  if (!jwt) throw new CustomError(jwtNotPresentErr, UNAUTHORIZED);

  const decodedUserData = await jwtUtil.decode(jwt); // Make sure user role is an admin
  if (!(typeof decodedUserData === 'object' && decodedUserData.is_admin)) throw new CustomError(jwtNotPresentErr, UNAUTHORIZED);

  res.locals.sessionUser = decodedUserData;
  next();
};