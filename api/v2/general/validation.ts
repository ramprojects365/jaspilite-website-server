import { RequestHandler } from "express";
import { ApiError } from "../../../model/shared/messages";

export const apiValidation: RequestHandler = (req, res, next) => {
    if (req.method === "OPTIONS" || req.accepts("application/json") || req.accepts("*/*")) {
        return next();
    }
    return next(new ApiError("Content Type Not Supported", "This Api only supports application/json", 400));
};