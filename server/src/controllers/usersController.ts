import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';

import db from '../db';

dotenv.config();

const { OK } = StatusCodes;

interface IUsersControllerRequest {
  offset?: number,
  count?: number,
}

const usersController = async (req: Request<{}, {}, {}, IUsersControllerRequest>, res: Response, __: NextFunction) => {
  const { query } = req;

  const offset = query.offset;
  const count = query.count;

  const users: any = offset && count ? await db.getUsersWithOffset(Number(offset), Number(count)) : await db.getAllUsers();

  res.status(OK).json({ data: users?.rows, total: users?.total || users.rowCount, success: true });
};

export default usersController;