import { findUserById } from "../dao/user.dao.js";
import { tokenVerify } from "./helper.js";

// for all routes auto apply middleware
export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next();
    try {
        const decoded = await tokenVerify(token);
        const user = await findUserById(decoded);
        if (!user) return next();
        req.user = user;
        next();
    } catch (error) {
        next()
    }

}