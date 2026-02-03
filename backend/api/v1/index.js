// api/v1/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import userRoute from "../../route/user.route.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4000",
    "https://task-management-uypq.vercel.app",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "id"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/", userRoute);

app.get("/ping", (req, res) => {
  res.json({ success: true, message: "Auth API working" });
});

connectDB();

export default app;
