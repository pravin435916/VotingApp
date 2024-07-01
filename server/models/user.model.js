import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age:{
    type:Number
  },
  mobile:{
    type:Number
  },
  email:{
    type:String,
    // unique: true,
  },
  address: {
    type: String,
  },
  aadharCardNumber:{
    type:Number,
    required:true
  },
  role:{
    type:String,
    enum:['voter','admin'],
    default:'voter'
  },
  password: {
    type: String,
    required: true
  },
  isVoted:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;
