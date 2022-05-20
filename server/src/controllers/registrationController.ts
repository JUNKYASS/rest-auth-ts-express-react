import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import logger from 'jet-logger';

import db from '../db';
import jwtUtil from '../utils/jwt';
import emailUtil from '../utils/email';
import { ParamMissingError, RegistrationError, CustomError } from '../utils/errors';
import { cookieProps } from '../utils/cookie';

dotenv.config();

const { OK, CONFLICT } = StatusCodes;

const registrationController = async (req: Request, res: Response, _: NextFunction) => {
  const { login, password, email, is_admin } = req.body;
  if (!(login && password && email && typeof is_admin === 'boolean')) throw new ParamMissingError();

  const errors = await validationResult(req);
  if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, CONFLICT);

  const hashedPass = await bcrypt.hash(password, 3);
  const activation_id = uuid();
  const user = await db.addUser({ login, password: hashedPass, email, is_admin, activation_id });
  if (!user) throw new RegistrationError();

  delete (user as any).password; // Because we'll save this data to JWT
  const jwt = await jwtUtil.sign({ ...user }); // Create jwt
  const token = await db.addAuthToken({ token: jwt, user_id: user.id }); // Save auth token to db

  if (!token) throw new RegistrationError();
  res.cookie(cookieProps.key, jwt, cookieProps.options); // Add jwt to cookie

  const activationLink = `${process.env.SERVER_URL}/api/auth/activation/${activation_id}`;
  const activation = await emailUtil.sendAccountActivationLink(user.email, activationLink).catch(err => { // Send activation email
    logger.err(err, true);

    throw new RegistrationError();
  });

  return res.status(OK).json({ message: `Registration successful! ${activation.message}`, activation, data: user, success: true });
};

export default registrationController;