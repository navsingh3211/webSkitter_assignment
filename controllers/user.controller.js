import bcrypt from 'bcrypt';
import {response,authenticationResponse} from '../utils/commonResponse.js';
import MESSAGES from '../utils/commonMessage.js';
import {generateToken} from '../utils/jwt.js';
import User from '../models/user.model.js';
import {createRegisterUserValidation} from '../utils/dataValidation.js';

/*
    ==>user registration api
    ==>steps:
        1.)existing user check
        2.)Hashed password
        3.)User creation
        4.)Token generation
*/
export const signUp = async(req,res)=>{
  try{  
    let body=req.body;
    /*Payload validation*/
    const validatePayload = createRegisterUserValidation.safeParse(body);
    if(!validatePayload.success){
      return res.status(411).json(await response(false, validatePayload.error.errors[0].message));
    }

    const isUserExit = await User.findOne({email:body.email,status:true});
    if(isUserExit){
        return res.status(401).json(await response(false, MESSAGES.USER_ALREADY_EXIT));
    }
    let hashedPassword = await bcrypt.hash(body.password, 10);
    const bodyData = {
        username:body.username,
        password:hashedPassword,
        email:body.email,
        timezone:"Asia/Kolkata"
    };
    const account = await User.create(bodyData);
    const jwtToken = generateToken({
        id: account._id,
        email: account.email
    });
    return res.status(401).json(
      await authenticationResponse(true, MESSAGES.USER_SIGNUP_COMPLETE, {}, {
        accessToken: jwtToken,
        userName: account.username ? account.username : "",
        userId: account._id
      })
    );
    
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const login = async (req, res)=>{
  try{
      let body=req.body;
      
      const isUserExit = await User.findOne({email:body.email,status:true});
      if(!isUserExit){
          return res.status(401).json(await response(false, MESSAGES.NO_USER_FOUND_WITHGIVEN_CRED,401));
      }
  
      let matchedPassword = await bcrypt.compare(body.password, isUserExit.password);
      if(!matchedPassword){
          return res.status(401).json(
            await authenticationResponse(true, MESSAGES.INVALID_CRED, {})
          );
      }
      const jwtToken = generateToken({
          id: isUserExit._id,
          email: isUserExit.email
      });
      console.log(matchedPassword,'matchedPassword')
      return res.status(401).json(
        await authenticationResponse(true, MESSAGES.LOGIN_SUCCESS, {}, {
          accessToken: jwtToken,
          userName: isUserExit.username ? isUserExit.username : "",
          userId: isUserExit._id
        })
      );
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const viewUserProfile = async(req,res)=>{
  try{
    const userId = req.authData.data.id;
    
    const userData = await User.findOne({_id:userId},{password:0});
    if(!userData){
        return res.status(401).json(await response(false, MESSAGES.NO_USER_FOUND_WITHGIVEN_CRED,401));
    }
    return res.status(200).json(await response(true, MESSAGES.USER_FOUND,userData));
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}

export const editProfile = async(req,res)=>{
  try{
    const userId = req.authData.data.id;
    const {email,username} = req.body;
    const profilePicture = req.file;
    let path;
    if(profilePicture){
      path=profilePicture.path;
    }
    let dataToUpdate = {
      username:username,
      email:email,
      profilePicPath:path
    }
    await User.updateOne(
      { _id: userId },
      {
          $set: dataToUpdate
      }
    );
    return res.status(200).json(await response(true, MESSAGES.USER_EDIT,null));
  }catch(error){
    return res.status(500).json(await response(false, MESSAGES.GENERAL_ERROR, error));
  }
}