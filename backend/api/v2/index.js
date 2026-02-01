// api/v2/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import taskRoute from "../../route/task.route.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://task-management-uypq.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  MOUNT ROUTES AT ROOT
app.use("/", taskRoute);

// test route (important)
app.get("/ping", (req, res) => {
  res.json({ success: true, message: "Task API working" });
});

// DB connection
connectDB();

export default app;
