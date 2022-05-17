import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

import { CustomError, UserNotFoundError } from '../utils/errors';
import db from '../db';

dotenv.config();
const { OK, BAD_REQUEST } = StatusCodes;

const activationController = async (req: Request, res: Response, next: NextFunction) => {
  const activation_id = req.params.id;
  const user = await db.getUserByActivationId(activation_id);
  if (!user) throw new UserNotFoundError();

  if (user.is_activated) return res.redirect(process.env.CLIENT_URL!);

  const activatedUser = await db.activateUser(user.id.toString());
  if (!activatedUser || !activatedUser.is_activated) throw new CustomError('Activation failed, please, try again', BAD_REQUEST);

  res.redirect(process.env.CLIENT_URL!);
}

export default activationController;