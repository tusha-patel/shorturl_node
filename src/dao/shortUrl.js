import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";


// create short url in data base
export const saveShortUrl = async (longUrl, shortUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl,
        });
        if (userId) {
            newUrl.user_id = userId;
        }
        await newUrl.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError("Short url already exists")
        }
        throw new Error(error.message);
    }
}

// fetch short url data 
export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    );
}



export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({ short_url: slug });
}   