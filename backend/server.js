import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import userRoute from './route/user.route.js'
import taskRoute from './route/task.route.js'

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://task-management-uypq.vercel.app",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "id"]
}));

app.options('*', cors());


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

