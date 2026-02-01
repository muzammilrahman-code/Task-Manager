// api/v1/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import userRoute from "../../route/user.route.js";

dotenv.config();

const app = express();

/* ✅ CORS CONFIG — FIXED */
// api/v2/index.js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-management-uypq.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "id"],
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());

app.use("/", userRoute);

app.get("/ping", (req, res) => {
  res.json({ success: true, message: "Auth API working" });
});

connectDB();

export default app;
