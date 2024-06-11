import express from 'express';
import {validateToken} from '../utils/jwt.js';
import {
  signUp,
  login,
  viewUserProfile,
  editProfile
} from '../controllers/user.controller.js';

const router = express.Router();

router.post(
  '/sign-up',signUp
);
router.post(
  '/log-in',login
);
router.get(
  '/view-user-profile',[validateToken],viewUserProfile
);
router.post(
  '/edit-user',[validateToken],editProfile
);

export default router;