import mongoose from 'mongoose';
import {response} from '../utils/commonResponse.js';
import MESSAGES from '../utils/commonMessage.js';
import Question from '../models/question.model.js';
import UserAnswer from '../models/userAnswer.model.js';

export const submitAnswerAgainstQues = async(req,res)=>{
  try{  
    const userId = req.authData.data.id;
    let body=req.body;
   
    const payloadData = {
      userId:userId,
      question:body.question,
      selectedOption:body.selectedOption
    }
    await UserAnswer.create(payloadData);
    
    return res.status(200).json(await response(true, MESSAGES.ANSWER_SUBMIT,null));
    
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const searchQuestionByAnswer = async(req,res)=>{
  try{  
    const userId = req.authData.data.id;
    const answer = req.query.answer;
    const questionListing = await UserAnswer.aggregate([
      {
        $match:{
          userId:new mongoose.Types.ObjectId(userId),
          selectedOption:answer
        }
      },
      {
        $lookup:{
          from:"questions",
          localField:"question",
          foreignField:"_id",
          as:"questionDetails"
        }
      },
      {
        $unwind:"$questionDetails"
      },
      {
        $lookup:{
          from:"users",
          localField:"userId",
          foreignField:"_id",
          as:"userDetails"
        }
      },
      {
        $unwind:"$userDetails"
      },
      {
        $project:{
          questionName:"$questionDetails.question",
          answerSelected:"$selectedOption",
          submittedAt:1,
          userName:"$userDetails.username"
        }
      }
    ]);
    if(questionListing){
      return res.status(200).json(await response(true, MESSAGES.ANSWER_FOUND,questionListing));
    }else{
      return res.status(200).json(await response(true, MESSAGES.ANSWER_NOT_FOUND,null));
    }
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}