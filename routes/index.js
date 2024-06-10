import express from 'express';
import userRoute from './user.route.js';
const router = express.Router();

const routes = ()=>{
  router.get('/', (req, res) => {
    res.json(
      'Welcome to Exam'
    );
  });
  router.use('/user', userRoute);
  return router;
}

export default routes;