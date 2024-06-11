
import {response} from '../utils/commonResponse.js';
import MESSAGES from '../utils/commonMessage.js';
import Category from '../models/category.model.js';

export const createCategory = async(req,res)=>{
  try{  
    let body=req.body;
    
    await Category.create({name:body.name});
    
    return res.status(200).json(await response(true, MESSAGES.CREATED_CAT,null));
    
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const categoryListing = async(req,res)=>{
  try{  
    
    const categoryListing = await Category.find();
    if(categoryListing){
      return res.status(200).json(await response(true, MESSAGES.CAT_FOUND,categoryListing));
    }else{
      return res.status(200).json(await response(true, MESSAGES.CAT_NOT_FOUND,null));
    }
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}