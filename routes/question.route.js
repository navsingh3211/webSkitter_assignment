import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
// import { join } from 'path';
import fs from 'fs';
import {
  createQuestion,
  getQuestionByCatId,
  addQuestionInBulk
} from '../controllers/question.constroller.js';

const router = express.Router();

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirnamee = dirname(__filename);
const directoryPath = join(__dirnamee, './../public/csv/');

// console.log('this is my dir', directoryPath);

//if folder for storing is not exit,create it
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

//multer configuration for files
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, directoryPath);
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post(
  '/create-question',createQuestion
);
router.get(
  '/get-question-by-catId/:catId',getQuestionByCatId
);

router.post(
  '/add_question_in_bulk',
  upload.fields([
    {
      name: 'questionCsv',
      maxCount: 1
    }
  ]),
  addQuestionInBulk
);


export default router;