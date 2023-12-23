import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Using dotenv package to configure .env files
// I know exposing secrete keys in public platforms is not a good practice but 
// for simplicity i am not adding .env file in .gitignore file
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to DB");
});
const app = express();
// Using express.json() to parse req body which has header content-type = application/json
app.use(express.json());
//  Using cookieparser to parse the cookies
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

// Handling error by using below middleware
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
