import express from 'express';
import {validateToken} from '../utils/jwt.js';
import {
  submitAnswerAgainstQues,
  searchQuestionByAnswer
} from '../controllers/userQuestionAns.controller.js';

const router = express.Router();

router.post(
  '/submit-answer-against-question',validateToken,submitAnswerAgainstQues
);
router.get(
  '/search-question-by-answer',validateToken,searchQuestionByAnswer
);


export default router;