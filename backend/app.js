// import
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import routes
import authRouter from "./routes/auth.routes.js";

// configurations
const app = express();

// middlewares:
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes

app.use("/v1/auth", authRouter);

export default app;
