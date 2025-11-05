import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import userRoute from './route/user.route.js'
import taskRoute from './route/task.route.js'

dotenv.config();
const app = express();
app.use(cors())

app.use(express.json())
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

