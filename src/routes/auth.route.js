import express from "express"
import { getCuurentUser, login, logoutUser, register } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logoutUser);
router.get("/me", authMiddleware, getCuurentUser)

export default router;