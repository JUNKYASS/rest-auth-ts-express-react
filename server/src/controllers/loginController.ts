import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import logger from 'jet-logger';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import db from '../db';
import jwtUtil from '../utils/jwt';
import { cookieProps } from '../utils/cookie';
import { UserNotFoundError, CustomError, ParamMissingError } from '../utils/errors';

dotenv.config();

const { OK, UNAUTHORIZED } = StatusCodes;

const loginController = async (req: Request, res: Response, _: NextFunction) => {
  const { login, password, is_admin } = req.body;
  if (!(login && password)) throw new ParamMissingError();

  const errors = await validationResult(req);
  if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, UNAUTHORIZED);

  const candidate = await db.getUserByLoginOrEmail(login);
  if (!candidate) throw new UserNotFoundError();

  if (!is_admin && candidate.is_admin) throw new UserNotFoundError(); // Make sure user role is an admin, if not then access denied

  const passwordPassed = await bcrypt.compare(password, candidate.password);
  if (!passwordPassed) throw new UserNotFoundError();

  delete (candidate as any).password;
  delete (candidate as any).activation_id;

  const jwt = await jwtUtil.sign({ ...candidate }); // Get jwt
  await db.query('INSERT INTO auth_tokens (user_id, token) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET token = $2', [candidate.id, jwt]).catch(e => { logger.err(e) });
  res.cookie(cookieProps.key, jwt, cookieProps.options); // Add jwt to cookie

  return res.status(OK).json({ message: 'Logged in successfully', data: candidate, success: true });
};

export default loginController;