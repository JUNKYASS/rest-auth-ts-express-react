import express, { Request, Response, NextFunction, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from 'jet-logger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import apiRouter from './routes/api';
import { CustomError } from './utils/errors';

dotenv.config();

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const PORT = process.env.PORT || 80;

app.use('/api', apiRouter);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
  logger.err(err, true);

  const status = err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;

  return res.status(status).json({
    message: err.message || 'Unexpected error, please, try again',
    error: err,
    success: false,
  });
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
});