import express from "express"
import connectDB from "./src/config/mongo.config.js";
import dotenv from "dotenv";
import shortUrlRoutes from "./src/routes/shortUrl.route.js";
import authRoutes from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import ErrorHandler from "./src/utils/errorHandler.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config("./.env");
const app = express();
app.use(cors({
    origin: "https://shorturl-frontend-nine.vercel.app",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// for all routes auto apply middleware
app.use(attachUser);

// routes
app.use("/api/create", shortUrlRoutes);
app.get("/:id", redirectFromShortUrl);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute)
app.get("/", (req, res) => {
    res.send("Hello World");
})

// global error handler
app.use(ErrorHandler);

// server 
app.listen(3000, () => {
    connectDB();
    console.log("server is running http://localhost:3000");
})