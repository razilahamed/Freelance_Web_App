import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import authorizationRoutes from "./routes/authorization.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("heydata");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/auth", authorizationRoutes);

app.listen(8800, () => {
  connect();
  console.log("connected");
});
