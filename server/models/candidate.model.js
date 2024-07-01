import mongoose from "mongoose";
const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age:{
    type:Number
  },
  party:{
    type:String
  },
  votes:
  [
    {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      // required:true
    },
    VotedTime :{
      type:Date,
      default:Date.now()
    }
  }
],
  count:{
    type:Number,
    default:0
  }
},{timestamps:true});

const Candidate = mongoose.model('Candidate', CandidateSchema);
export default Candidate;
