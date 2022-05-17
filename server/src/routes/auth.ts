import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import db from '../db';
import { registrationValidators, loginValidators } from '../utils/validators';
import jwtUtil from '../utils/jwt';
import emailUtil from '../utils/email';

const router = Router();

const { OK, BAD_REQUEST } = StatusCodes;

const cookieProps = Object.freeze({ // Cookie Properties
  key: 'access_token',
  secret: process.env.COOKIE_SECRET,
  options: {
    httpOnly: true,
    signed: true,
    path: (process.env.COOKIE_PATH),
    maxAge: Number(process.env.COOKIE_EXP),
    domain: (process.env.COOKIE_DOMAIN),
    secure: (process.env.SECURE_COOKIE === 'true'),
  },
});

router.use('/login', loginValidators, async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    if (!(login && password)) return res.status(BAD_REQUEST).json({ message: 'You must specify password and login/email', success: false });

    const errors = await validationResult(req);

    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: `Login is not completed. ${errors.array()[0].msg}`, success: false, err: errors.array() });

    const candidate = await db.getUserByLoginOrEmail(login);

    if (!candidate) return res.status(BAD_REQUEST).json({ message: 'User doesn\'t exists', success: false });

    const passwordPassed = await bcrypt.compare(password, candidate.password);

    if (!passwordPassed) return res.status(BAD_REQUEST).json({ message: 'User doesn\'t exists', success: false });

    delete (candidate as any).password;

    const jwt = await jwtUtil.sign({ ...candidate }); // Get jwt
    res.cookie(cookieProps.key, jwt, cookieProps.options); // Add jwt to cookie

    return res.status(OK).json({ message: 'Logged in successfully', success: true });
  } catch (err) {
    return res.status(BAD_REQUEST).json({ message: 'Login failed', success: false, err });
  }
});

router.post('/registration', registrationValidators, async (req: Request, res: Response) => {
  try {
    const { login, password, email, is_admin } = req.body;

    if (!(login && password && email && typeof is_admin === 'boolean')) return res.status(BAD_REQUEST).json({ message: 'You must specify all the values', success: false });

    const errors = await validationResult(req);

    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: `Registration is not completed. ${errors.array()[0].msg}`, err: errors.array(), success: false });

    const hashedPass = await bcrypt.hash(password, 3);
    const activation_id = uuid();

    const insertedData = await db.addUser({ login, password: hashedPass, email, is_admin, activation_id }, async (err) => {
      if (err) return res.status(BAD_REQUEST).json({ message: 'Registration is not completed', err, success: false });
    });

    const user = insertedData?.rows[0];
    if (!user) return res.status(BAD_REQUEST).json({ message: 'Registration is not completed', success: false });

    delete (user as any).password;

    const jwt = await jwtUtil.sign({ ...user }); // Get jwt
    await db.addAuthToken({ token: jwt, user_id: user.id });

    const activationLink = `${process.env.SERVER_URL}/api/auth/activation/${activation_id}`;
    const result = await emailUtil.sendAccountActivationLink(user.email, activationLink);

    if (result?.error) return res.status(BAD_REQUEST).json({ message: 'Registration is not completed', err: result.error, success: false });

    return res.status(OK).json({ message: 'Registration successful!', result, success: true });
  } catch (e) {
    return res.status(BAD_REQUEST).json({ message: 'Registration is not completed', error: e, success: false });
  }
});

router.get('/activation/:id', async (req, res) => {
  try {
    const activation_id = req.params.id;

    const user = await db.getUserByActivationId(activation_id);

    if (user) {
      if (user.is_activated) return res.redirect(process.env.CLIENT_URL!);
      const activatedUser = await db.activateUser(user.id.toString());

      if (!activatedUser || !activatedUser.is_activated) return res.json({ message: 'Activation failed, please try again', success: false, })


      return res.redirect(process.env.CLIENT_URL!);
    } else {
      return res.json({ message: 'Activation failed, please try again', success: false, });
    }
  } catch (e) {
    return res.status(BAD_REQUEST).json({ message: 'Activation failed, please try again', error: e, success: false });
  }
});

router.get('/checkToken', async (req, res) => {
  try {
    const token = req.signedCookies[cookieProps.key];
    const data = await jwtUtil.decode(token);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
})

export default router;