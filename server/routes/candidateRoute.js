import express from "express";
import Candidate from "../models/candidate.model.js";
import User from "../models/user.model.js";
import verifyToken from "../middlerWare/VerifyToken.js";
const router = express.Router();
const checkAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === "admin";
  } catch (error) {
    return false;
  }
};
router.post("/create", verifyToken, async (req, res) => {
  const data = req.body;
  try {
    if (!await checkAdmin(req.userId)) {
      return res.status(400).json({ message: "User has not admin accesss" });
    }else{
      console.log('admin not found')
    }
    const newCandidate = new Candidate(data);
    await newCandidate.save();
    res.status(500).json({ message: "Created Candidate Successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.put("/:candidateId", verifyToken, async (req, res) => {
  try {
    if (!await checkAdmin(req.userId)) {
      return res.status(401).json({ message: "User has not admin accesss" });
    }
    const candidateId = req.params.candidateId;
    const updatedData = req.body;
    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(400).json({ message: " Candidate not found" });
    }
    await response.save();
    res.status(500).json({ message: "Get Candidate Successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.delete("/:candidateId", verifyToken, async (req, res) => {
  try {
    if (!checkAdmin(req.userId)) {
      return res.status(401).json({ message: "User has not admin accesss" });
    }
    const candidateId = req.params.candidateId;
    const response = await Candidate.findByIdAndDelete(candidateId);
    if (!response) {
      return res.status(400).json({ message: " Candidate not found" });
    }
    await response.save();
    res.status(500).json({ message: "Deleted Candidate Successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.post("/vote/:candidateId",verifyToken, async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const userId = req.userId;
    const candidate = await Candidate.findById(candidateId);
    console.log(candidateId)
    console.log(userId)
    if (!candidate) {
      return res.status(400).json({ message: " Candidate not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if(user.isVoted) {
      return res.status(400).json({ message: "User Already Voted" });
    }
    if(user.role === 'admin') {
      return res.status(400).json({ message: " Admin can't Vote" });
    }
    candidate.votes.push({user:userId});
    candidate.count++;
    await candidate.save();
    //now user
    user.isVoted = true;
    await user.save();
    return res.status(200).json({ message: "Vote Recorded Successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
//voting record
router.get("/vote/counts", async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({count:-1});
    const record = candidate.map((item)=> {
      return{
        party:item.party,
        count:item.count
      }
    })
    return res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
//get posts
router.get("/", async (req, res) => {
  try {
    const post = await Candidate.find();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
