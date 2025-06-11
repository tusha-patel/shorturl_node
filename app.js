// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/mongo.config.js";
import shortUrlRoutes from "./src/routes/shortUrl.route.js";
import authRoutes from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import ErrorHandler from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "https://shorturl-frontend-nine.vercel.app",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// Routes
app.use("/api/create", shortUrlRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.get("/:id", redirectFromShortUrl);
app.get("/", (req, res) => res.send("Hello World"));

// Global error handler
app.use(ErrorHandler);

export default app;
