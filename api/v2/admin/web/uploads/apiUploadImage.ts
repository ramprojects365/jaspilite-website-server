import { RequestHandler } from "express-serve-static-core";

import { getFileUploader, fileMapper } from "../../../general/static";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";

export const ApiUploadImage: RequestHandler = (req, res, next) => {
    const upload = getFileUploader(req.app.get("env"));
    upload(req, res, (error) => {
        if (error) {
            responseLogger.print("Error Get Shops Count...", req, res);
            return next(ApiError.errUploadImageFailed(error));
        } else {
            if (req.file) {
                // To change image to full image path
                res.json(PublicInfo.infoSendData({ image: fileMapper(req.app.get("env"), req.file.filename, "cache") }));
            } else {
                return next(ApiError.errMissingBody("File missing in request"));
            }
        }
    });
}