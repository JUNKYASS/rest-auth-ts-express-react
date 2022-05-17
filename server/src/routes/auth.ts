import { Router, Request, Response, NextFunction, IRouter } from 'express';
import dotenv from 'dotenv';
import { registrationValidators, loginValidators } from '../utils/validators';

import loginController from '../controllers/loginController';
import registrationController from '../controllers/registrationController';
import activationController from '../controllers/activationController';
import tokenVerifyController from '../controllers/tokenVerifyController';

dotenv.config();
const router = Router();

// Wrapper for the error handling
const use = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>> | any) => {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/login', loginValidators, use(loginController));
router.post('/registration', registrationValidators, use(registrationController));
router.get('/activation/:id', use(activationController));
router.get('/token/verify', use(tokenVerifyController))

export default router;