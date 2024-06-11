import { Schema, model } from 'mongoose';

const _schema = new Schema(
  {
    userId: {
       type: Schema.Types.ObjectId, 
       ref: 'User', 
       required: true 
    },
    question: {
      type: Schema.Types.ObjectId, 
      ref: 'Question', 
      required: true 
    },
    selectedOption: { 
      type: String
    },
    submittedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

export default model('UserAnswer', _schema);