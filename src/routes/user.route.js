import express from "express";
import { getUserUrls } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/urls", authMiddleware, getUserUrls);


export default router;