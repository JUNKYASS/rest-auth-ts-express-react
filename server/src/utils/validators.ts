import { body } from 'express-validator';
import logger from 'jet-logger';

import db from '../db';

export const registrationValidators = [
  body('email', 'Use correct email').isEmail().custom(async (value, { req }) => {
    try {
      // const candidate = await db.query('SELECT * FROM users WHERE login = $1 OR email = $2', [req.body.login, req.body.email]);
      const candidate = await db.getUserByLoginOrEmail(req.body.login, req.body.email);
      if (candidate) return Promise.reject('User with such login or email already exists');
    } catch (e) {
      logger.err(e)
    }
  }),
  body('login', 'Login must contain at least 3 characters').isLength({ min: 3 }),
  body('password', 'Password must be between 3 and 56 characters').isLength({ min: 5, max: 56 }).trim(),
  body('password_confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must be equal');
    }

    return true;
  }),
];

export const loginValidators = [
  body('login', 'Login or email is not correct').notEmpty(),
  body('password', 'Password must be between 3 and 56 characters').isLength({ min: 5, max: 56 }).trim(),
];