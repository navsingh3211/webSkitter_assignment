import { Schema, model } from 'mongoose';

const _schema = new Schema(
  {
    name: { 
      type: String, required: true, unique: true 
    }
  },
  {
    timestamps: true
  }
);

export default model('Category', _schema);