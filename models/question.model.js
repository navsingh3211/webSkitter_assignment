import { Schema, model } from 'mongoose';

const _schema = new Schema(
  {
    text: { type: String, required: true },
    options: [
      { 
        text: String, 
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