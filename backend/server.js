import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import userRoute from './route/user.route.js'
import taskRoute from './route/task.route.js'

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    "https://task-management-uypq.vercel.app",  // frontend
    "https://task-manager-five-rho-37.vercel.app", // backend domain
    "http://localhost:5173", // frontend local
    "http://localhost:5000"  // backend local
  ],
  credentials: true,
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));  
const port = process.env.PORT || 5000;

app.use('/api/v1', userRoute)
app.use('/api/v2', taskRoute)
app.get('/', (req, res) =>{
    res.send("hello server is running");
})

connectDB();
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

