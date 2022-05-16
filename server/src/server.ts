import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from 'jet-logger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import apiRouter from './routes/api';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const PORT = process.env.PORT || 80;

app.use('/api', apiRouter);

// Error handling
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  const status = StatusCodes.BAD_REQUEST;

  logger.err(err, true);

  return res.status(status).json({ error: err.message, });
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
})