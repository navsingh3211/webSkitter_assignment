
import {response} from '../utils/commonResponse.js';
import MESSAGES from '../utils/commonMessage.js';
import Category from '../models/category.model.js';
import Question from '../models/question.model.js';
import fs from 'fs';
import { join,dirname } from 'path';
import xlsxFile from 'read-excel-file/node';

export const createQuestion = async(req,res)=>{
  try{  
    let {question,options,categories}=req.body;
    const categoryDocs = await Category.find({ _id: { $in: categories } });
    if (categoryDocs.length !== categories.length) {
      return res.status(200).json(await response(true, MESSAGES.CATEGORY_INVALID,null));
    }
    await Question.create(
      {
        question:question,
        options:options,
        categories:categories
      }
    );
    
    return res.status(200).json(await response(true, MESSAGES.QUESTION_CREATED,null));
    
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const getQuestionByCatId = async(req,res)=>{
  try{  
    const {catId} = req.params;
    const questionListing = await Question.find({categories:catId});
    if(questionListing){
      return res.status(200).json(await response(true, MESSAGES.QUESTION_FOUND,questionListing));
    }else{
      return res.status(200).json(await response(true, MESSAGES.NO_QUESTION_FOUND_BY_CAT,null));
    }
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const addQuestionInBulk = async(req,res)=>{
  try{  
    if (req.files.questionCsv && req.files.questionCsv.length > 0) {
      let questionCsv = req.files.questionCsv[0];
      let filePath = join(questionCsv.destination, questionCsv.originalname);
      
      const rows = await xlsxFile(filePath);
     
      if (rows && rows.length > 0) {
          let key = rows[0];
          let bulkQuestionUploadData = [];
          for (let i = 1; i < rows.length; i++) {
              let element = rows[i];
              let bulkQuestionObj = {};

              for (let j = 0; j < element.length; j++) {
                  bulkQuestionObj[key[j]] = element[j];
              }
              bulkQuestionUploadData.push(bulkQuestionObj);
          }
          // console.log(bulkQuestionUploadData);
          // process.exit(0);
          
          if (bulkQuestionUploadData && bulkQuestionUploadData.length>0){

              //store data
              for (let element of bulkQuestionUploadData){
                  // console.log(element,'element');
                  // process.exit(0);
                  let question = element['Question'];
                  let option = [
                    {
                      option:element['Options'],
                      isCorrect:true
                    }
                  ]
                  let CategoryName = element['Categories'];
                  let categoryIdByName = await Category.findOne({name:CategoryName})

                  letquestionCreated = await Question.create({ 
                    question:question,
                    options:option,
                    categories:[categoryIdByName._id]
                  });
                    
              }
              // unlink the file
              fs.unlinkSync(filePath);
              return {
                  success: true,
                  message: 'Data has been created successfully',
                  code: 201,
                  data: null
              }; 
          }else{
              return {
                  success: false,
                  message: 'No Data Found!',
                  code: 201,
                  data: null
              };
          }
      }else{
          return {
              success: false,
              message: 'No Data Found!',
              code: 201,
              data: null
          };
      }
    }else{
        return {
            success: false,
            message: 'File is missing!',
            code: 201,
            data: null
        }
    }
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}