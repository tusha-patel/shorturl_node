import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

// create short url
export const createShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body;
    let shortUrl
    if (req.user) {
        shortUrl = await createShortUrlWithUser(url, req.user._id, slug);
    } else {
        shortUrl = await createShortUrlWithoutUser(url);
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});


// Controller to handle redirection from a short URL to the full original URL
export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    if (url) {
        res.redirect(url.full_url)
    }
});
