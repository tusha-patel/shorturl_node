import { findUserById } from "../dao/user.dao.js";
import { tokenVerify } from "../utils/helper.js";


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = tokenVerify(token);
        const user = await findUserById(decoded)
        if (!user) return res.status(401).json({ message: "unAuthorized" })
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


