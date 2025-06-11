import { cookieOption } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

// register user
const register = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOption);
    res.status(200).json({ message: "Register success", user: user });
});

// login user
const login = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    req.user = user;

    res.cookie("accessToken", token, cookieOption);
    res.status(200).json({ user: user, message: "Login success" });
});

// logout user
const logoutUser = wrapAsync(async (req, res) => {
    res.clearCookie("accessToken", cookieOption);
    res.status(200).json({ message: "Logout success" });
})

// get current user
const getCuurentUser = wrapAsync(async (req, res) => {
    res.status(200).json({ user: req.user });
})



export { register, login, logoutUser, getCuurentUser };