import urlSchema from "../models/shortUrl.model.js";
import User from "../models/user.model.js"


// find user with email
export const findByEmail = async (email) => {
    return await User.findOne({ email })
}


// find user with email and include password from user object
export const findByEmailByPassword = async (email) => {
    return await User.findOne({ email }).select("+password");
}

// create new user
export const createUser = async (name, email, password) => {
    const newUser = new User({
        name,
        email,
        password,
    });
    return await newUser.save();
}

// find user with id
export const findUserById = async (id) => {
    return await User.findById(id);
}


// get user all urls
export const getAllUserUrls = async (userId) => {
    return await urlSchema.find({ user_id: userId })
}