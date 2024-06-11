import express from 'express';
import {validateToken} from '../utils/jwt.js';
import {
  submitAnswerAgainstQues
} from '../controllers/userQuestionAns.controller.js';

const router = express.Router();

router.post(
  '/submit-answer-against-question',validateToken,submitAnswerAgainstQues
);
// router.get(
//   '/category-listing',categoryListing
// );


export default router;