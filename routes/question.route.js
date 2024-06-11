import express from 'express';
import {validateToken} from '../utils/jwt.js';
import {
  createQuestion
} from '../controllers/question.constroller.js';

const router = express.Router();

router.post(
  '/create-question',createQuestion
);
// router.get(
//   '/category-listing',categoryListing
// );


export default router;