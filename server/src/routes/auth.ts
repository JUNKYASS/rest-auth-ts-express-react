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

    if (!(login && password)) return res.status(BAD_REQUEST).json({ message: 'You must specify password and login/email', auth: false });

    const errors = await validationResult(req);

    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: `Login is not completed. ${errors.array()[0].msg}`, auth: false, err: errors.array() });

    const candidate = await db.getUserByLoginOrEmail(login);

    if (!candidate) return res.status(BAD_REQUEST).json({ message: 'User doesn\'t exists', auth: false });

    const passwordPassed = await bcrypt.compare(password, candidate.password);

    if (!passwordPassed) return res.status(BAD_REQUEST).json({ message: 'User doesn\'t exists', auth: false });

    delete (candidate as any).password;

    const jwt = await jwtUtil.sign({ ...candidate }); // Get jwt
    res.cookie(cookieProps.key, jwt, cookieProps.options); // Add jwt to cookie

    return res.status(OK).json({ message: 'Logged in successfully', auth: true });
  } catch (err) {
    return res.status(BAD_REQUEST).json({ message: 'Login failed', auth: false, err });
  }
});

router.post('/registration', registrationValidators, async (req: Request, res: Response) => {
  try {
    const { login, password, email, is_admin } = req.body;

    if (!(login && password && email && is_admin)) return res.status(BAD_REQUEST).json({ message: 'You must specify all the values', auth: false });

    const errors = await validationResult(req);

    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: `Registration is not completed. ${errors.array()[0].msg}`, err: errors.array() });

    const hashedPass = await bcrypt.hash(password, 3);
    const activation_link = uuid();

    await db.addUser({ login, password: hashedPass, email, is_admin, activation_link }, (err, result) => {
      if (err) return res.status(BAD_REQUEST).json({ message: 'Registration is not completed', err });



      if (result) return res.status(OK).json({ message: 'Registration successful!', result });
    });
  } catch (err) {
    return res.status(BAD_REQUEST).json({ message: 'Registration is not completed', err });
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