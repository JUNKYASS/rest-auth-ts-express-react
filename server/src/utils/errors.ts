import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';

export class CustomError extends Error {
  public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor(msg: string, httpStatus: number) {
    super(msg);
    this.HttpStatus = httpStatus;
  }
};

export class ParamMissingError extends CustomError {
  public static readonly Msg = 'One or more of the required parameters was missing.';
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
  }
};

export class UserNotFoundError extends CustomError {
  public static readonly Msg = 'A user with the given params does not exists';
  public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

  constructor() {
    super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
  }
};

export class UnauthorizedError extends CustomError {
  public static readonly Msg = 'Login failed';
  public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

  constructor() {
    super(UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
  }
};


export class RegistrationError extends CustomError {
  public static readonly Msg = 'Registration failed';
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(RegistrationError.Msg, RegistrationError.HttpStatus);
  }
};

// Wrapper for the error handling
export const use = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>> | any) => {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
};