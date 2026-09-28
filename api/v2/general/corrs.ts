import { RequestHandler } from "express-serve-static-core";

export const apiCorrs: RequestHandler = (req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    });
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
};