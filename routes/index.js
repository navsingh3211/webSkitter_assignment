import express from 'express';
import userRoute from './user.route.js';
import categoryRoute from './category.route.js';
import questionRoute from './question.route.js';
import answerQuestionRoute from './userQuestionAns.route.js';
const router = express.Router();

const routes = ()=>{
  router.get('/', (req, res) => {
    res.json(
      'Welcome to Exam'
    );
  });
  router.use('/user', userRoute);
  router.use('/category', categoryRoute);
  router.use('/question', questionRoute);
  router.use('/answer-question', answerQuestionRoute);

  return router;
}

export default routes;