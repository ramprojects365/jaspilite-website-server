import { ErrorRequestHandler } from "express";
import { responseLogger } from "./responseLogs";

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = typeof err?.status === "number" && err.status >= 400 && err.status < 600 ? err.status : 500;
    responseLogger.outputLog();
    if (req.app.get("env") === "production") {
        console.error("Error prod - ", JSON.stringify(err));
    } else {
        console.error("Error dev - ", err);
    }
    if (res.headersSent) {
        return next(err);
    }
    return res.status(statusCode).json(err && typeof err === "object" ? err : { message: String(err) });
};