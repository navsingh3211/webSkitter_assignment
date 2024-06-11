import zod from 'zod';

export const createCategoryValidation = zod.object({
    name:zod.string().refine((val)=>val.trim().length>0,{
      message:'Please enter the email'
    })
});

export const createQuestionValidation = zod.object({
  question:zod.string().refine((val)=>val.trim().length>0,{
    message:'Please enter the question'
  })
});


export const createRegisterUserValidation = zod.object({
  username:zod.string().refine((val)=>val.trim().length>0,{
    message:'Please enter the username'
  }),
  email:zod.string().refine((val)=>val.trim().length>0,{
    message:'Please enter the email'
  }),
  password:zod.string().refine((val)=>val.trim().length>0,{
    message:'Please enter the password'
  })
});

export const submitAnswerValidation = zod.object({
  question:zod.string().refine((val)=>val.trim().length>0,{
    message:'Please enter the question'
  }),
  selectedOption:zod.string().refine((val)=>val.trim().length>0,{
    message:'Please enter the selectedOption'
  })
});