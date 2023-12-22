import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser";


dotenv.config();
mongoose
  .connect(
    "mongodb+srv://niranjantm35:niranjan047@assignment0.k8zlab1.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  });
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    errorMessage: message,
    statusCode,
  });
});
app.listen(4000, () => {
  console.log("Live at 4000");
});
