import { Schema, model } from 'mongoose';

const _schema = new Schema(
  {
    username: {
      type: String,
      required:true,
      index: true
    },
    email:{
      type: String,
      required:true,
      index: true
    },
    password:{
      type: String,
      required:true
    },
    profilePicPath: {
      type: String,
      default:''
    },
    timezone: {
      type: String, required: false
    },
    status: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export default model('User', _schema);