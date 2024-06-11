
import {response} from '../utils/commonResponse.js';
import MESSAGES from '../utils/commonMessage.js';
import Category from '../models/category.model.js';
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

// export const categoryListing = async(req,res)=>{
//   try{  
    
//     const categoryListing = await Category.find();
//     if(categoryListing){
//       return res.status(200).json(await response(true, MESSAGES.CAT_FOUND,categoryListing));
//     }else{
//       return res.status(200).json(await response(true, MESSAGES.CAT_NOT_FOUND,null));
//     }
//   }catch(error){
//     return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
//   }
// }