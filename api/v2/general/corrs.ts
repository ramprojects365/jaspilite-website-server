import { RequestHandler } from "express-serve-static-core";

export const apiCorrs: RequestHandler = (req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
    });
    next();
}