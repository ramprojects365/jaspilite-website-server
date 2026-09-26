import { RequestHandler } from "express-serve-static-core";
import multer from "multer";
import path from "path";
import uuid from "uuid/v4";

export function getStaticHome(env: string, folder: string) {
    if (folder === 'product_images') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/product_images/"
            case "production":
                return "https://minimart.app/public/product_images/"
            default:
                return "https://minimart.app/public/product_images/"
        }
    } else if (folder === 'shop_images') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/shop_images/"
            case "production":
                return "https://minimart.app/public/shop_images/"
            default:
                return "https://minimart.app/public/shop_images/"
        }
    } else if (folder === 'cache') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/cache/"
            case "production":
                return "https://minimart.app/public/cache/"
            default:
                return "https://minimart.app/public/cache/"
        }
    }
}

export function fileMapper(env: string, filename: string, folder: string) {
    return getStaticHome(env, folder) + filename;
}

export function getFileUploader(env: string): RequestHandler {
    const fileID = uuid();
    switch (env) {
        case "development":
            const fileStore = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, path.resolve("./", "public", "cache"));
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path.extname(file.originalname));
                }
            });
            return multer({ storage: fileStore }).single("file");
        case "production":
            const prodStore = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, path.resolve("./", "public", "cache"));
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path.extname(file.originalname));
                }
            });
            return multer({ storage: prodStore }).single("file");
        default:
            return (req, res, next) => { next() };
    }
}