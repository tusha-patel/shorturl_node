import { nanoid } from "nanoid"
import jwt, { decode } from "jsonwebtoken"
import { cookieOption } from "../config/config.js"

export const generateNanoId = (length) => {
    return nanoid(length)
}


// for cookies set token
export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

// token verify
export const tokenVerify = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    return decoded.id;
}