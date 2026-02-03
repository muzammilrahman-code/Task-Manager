// api/v2/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import taskRoute from "../../route/task.route.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "https://task-management-uypq.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4000",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "id"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", taskRoute);

app.get("/ping", (req, res) => {
  res.json({ success: true, message: "Task API working" });
});

connectDB();

export default app;
