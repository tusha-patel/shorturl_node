// api/index.js
import serverless from "serverless-http";
import app from "../app.js";
import connectDB from "../src/config/mongo.config.js";

await connectDB(); // ensure DB connection before handling requests

export const handler = serverless(app);
