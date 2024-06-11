import { Schema, model } from 'mongoose';

const _schema = new Schema(
  {
    question: {
       type: String, required: true 
    },
    options: [
      { 
        option: String, 
        isCorrect: Boolean 
      }
    ],
    categories: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Category' 
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Question', _schema);