import express from 'express'
import mongoose from 'mongoose';
import userRoute from './routes/users.js';
import candidateRoute from './routes/candidateRoute.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
const mongoURI = process.env.MONGO_URL;
// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/candidate', candidateRoute);

app.listen(port, () => console.log(`Server listening on port ${port}`));
