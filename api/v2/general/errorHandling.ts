import { ErrorRequestHandler } from "express";
import { responseLogger } from "./responseLogs";

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    switch (req.app.get("env")) {
        case "development":
            responseLogger.outputLog();
            console.log("Error dev - " + err);
            return res.status(err.status).json(err);
        case "production":
            responseLogger.outputLog();
            console.log("Error prod - " + JSON.stringify(err));
            return res.status(err.status).json(err);
    }
};