import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'PRAV2004';
import verifyToken from '../middlerWare/VerifyToken.js';
// Signup route
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.json({ message: 'Invalid Data' });
      return;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newVoter = new User(data);
    const savedVoter = await newVoter.save();
    
    const token = jwt.sign({ userId: newVoter._id }, 'PRAV2004', { expiresIn: '3600s' });
    res.status(201).json({ userId:newVoter._id,message: 'New Voter created successfully', voter: savedVoter ,token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;
    console.log(aadharCardNumber,password)
    const user = await User.findOne({ aadharCardNumber });
    if (!user) return res.status(400).json({ message: 'Invalid Aadhar or password' });
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3600s' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
//token middleware



// Get user profile by user ID
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId as set by verifyToken middleware
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
//change password
router.put('/profile/password', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId as set by verifyToken middleware
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found' });
    }
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password directly with the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password does not match' });
    }

    // Hash the new password with a stronger cost factor
    const saltRounds = 12; // Adjust as needed (higher = more secure)
    const newHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the user document with the new hashed password
    user.password = newHash;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    // Provide more specific error message if possible
    res.status(500).json({ message: 'Error updating password' });
  }
});


export default router
