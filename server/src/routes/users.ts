import { Router } from 'express';
import dotenv from 'dotenv';

import usersController from '../controllers/usersController';
import { use } from '../utils/errors';
import { isAdmin } from '../middlewares/isAdmin';

dotenv.config();

const router = Router();

router.get('/', use(isAdmin), use(usersController));

export default router;