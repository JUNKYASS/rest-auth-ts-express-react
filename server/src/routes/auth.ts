import { Router, Request, Response, NextFunction, IRouter } from 'express';
import dotenv from 'dotenv';

import { use } from '../utils/errors';
import { registrationValidators, loginValidators } from '../middlewares/validators';
import loginController from '../controllers/loginController';
import logoutController from '../controllers/logoutController';
import registrationController from '../controllers/registrationController';
import activationController from '../controllers/activationController';
import tokenVerifyController from '../controllers/tokenVerifyController';

dotenv.config();

const router = Router();

router.post('/login', loginValidators, use(loginController));
router.post('/logout', use(logoutController));
router.post('/registration', registrationValidators, use(registrationController));
router.get('/activation/:id', use(activationController));
router.get('/token/verify', use(tokenVerifyController));

export default router;