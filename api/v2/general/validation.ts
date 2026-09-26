import { RequestHandler } from "express";
import { ApiError } from "../../../model/shared/messages";

export const apiValidation: RequestHandler = (req, res, next) => {
    if (req.accepts("application/json")) {
        next();
    } else {
        next(new ApiError("Content Type Not Supported", "This Api only supports application/json", 400));
        next();
    }
}