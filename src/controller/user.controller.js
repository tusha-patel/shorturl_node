import { getAllUserUrls } from "../dao/user.dao.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

// get user all urls
export const getUserUrls = wrapAsync(async (req, res) => {
    const { _id: userId } = req.user;
    const urls = await getAllUserUrls(userId);
    res.status(200).json({ message: "success", urls });
})