import { RequestHandler } from "express-serve-static-core";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getFileUploader, fileMapper } from "../../../general/static";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";

export const ApiUploadImage: RequestHandler = (req, res, next) => {
    const upload = getFileUploader(req.app.get("env"));
    upload(req, res, async (error) => {
        if (error) {
            responseLogger.print("Error Upload Image...", req, res);
            return next(ApiError.errUploadImageFailed(error));
        } else {
            if (req.file) {
                if (process.env.AWS_S3_BUCKET_NAME && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
                    try {
                        const s3Client = new S3Client({
                            region: process.env.AWS_REGION || "ap-southeast-2",
                            credentials: {
                                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                            }
                        });
                        const fileContent = fs.readFileSync(req.file.path);
                        const s3Key = `uploads/${req.file.filename}`;
                        await s3Client.send(new PutObjectCommand({
                            Bucket: process.env.AWS_S3_BUCKET_NAME,
                            Key: s3Key,
                            Body: fileContent,
                            ContentType: req.file.mimetype || "image/jpeg"
                        }));
                        const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || "ap-southeast-2"}.amazonaws.com/${s3Key}`;
                        return res.json(PublicInfo.infoSendData({ image: s3Url }));
                    } catch (s3Err) {
                        console.error("S3 Upload Error, falling back to local storage:", s3Err);
                    }
                }
                // Fallback to local storage
                res.json(PublicInfo.infoSendData({ image: fileMapper(req.app.get("env"), req.file.filename, "cache") }));
            } else {
                return next(ApiError.errMissingBody("File missing in request"));
            }
        }
    });
};