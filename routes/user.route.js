import express from 'express';
import {signUp,login} from '../controllers/user.controller.js';

const router = express.Router();

router.post(
  '/sign-up',signUp
);
router.post(
  '/log-in',login
);

export default router;