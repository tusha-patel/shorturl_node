import bcrypt from "bcryptjs";
import { createUser, findByEmail, findByEmailByPassword } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js"

// register user
export const registerUser = async (name, email, password) => {
    const user = await findByEmail(email);
    if (user) throw new ConflictError("user already exists");
    const newUser = await createUser(name, email, password);
    const token = await signToken({ id: newUser._id });
    return { token, user: newUser };
}

// login user
export const loginUser = async (email, password) => {
    const user = await findByEmailByPassword(email);
    if (!user) throw new Error("Invalid credential");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credential");

    const token = await signToken({ id: user._id });
    // Destructure to remove password 
    // const { password: pass, ...safeUser } = user.toObject();
    return { token, user: user };
};
