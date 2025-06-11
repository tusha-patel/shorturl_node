import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";

// create short url with login user
export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error("Short url not generated");
    await saveShortUrl(url, shortUrl)
    return shortUrl;
}

// create short url without login user
export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(7);
    const exists = await getCustomShortUrl(slug);

    if (exists) throw new Error("this custom url already exists");

    await saveShortUrl(url, shortUrl, userId);
    return shortUrl;
}