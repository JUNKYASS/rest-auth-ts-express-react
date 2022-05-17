import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import db from '../db';
import jwtUtil from '../utils/jwt';
import { cookieProps } from '../utils/cookie';
import { UserNotFoundError, CustomError, ParamMissingError } from '../utils/errors';

dotenv.config();
const { OK, UNAUTHORIZED } = StatusCodes;

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;
  if (!(login && password)) throw new ParamMissingError();

  const errors = await validationResult(req);
  if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, UNAUTHORIZED);

  const candidate = await db.getUserByLoginOrEmail(login);
  if (!candidate) throw new UserNotFoundError();

  const passwordPassed = await bcrypt.compare(password, candidate.password);
  if (!passwordPassed) throw new UserNotFoundError();

  delete (candidate as any).password;
  const jwt = await jwtUtil.sign({ ...candidate }); // Get jwt
  res.cookie(cookieProps.key, jwt, cookieProps.options); // Add jwt to cookie

  return res.status(OK).json({ message: 'Logged in successfully', success: true });
}

export default loginController;