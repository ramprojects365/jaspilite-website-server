import { RequestHandler } from "express-serve-static-core";
import multer from "multer";
import path from "path";
import fs from "fs";
import uuid from "uuid/v4";

export function getPublicDir() {
    if (fs.existsSync(path.resolve("./", "public"))) {
        return path.resolve("./", "public");
    }
    return path.resolve(__dirname, "../../../public");
}

export function getStaticHome(env: string, folder: string) {
    if (process.env.STATIC_BASE_URL) {
        const base = process.env.STATIC_BASE_URL.replace(/\/+$/, '');
        return `${base}/public/${folder}/`;
    }
    const port = process.env.PORT || 3005;
    if (env === "development") {
        return `http://localhost:${port}/public/${folder}/`;
    }
    if (process.env.BACKEND_URL) {
        const base = process.env.BACKEND_URL.replace(/\/+$/, '');
        return `${base}/public/${folder}/`;
    }
    if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/public/${folder}/`;
    }
    return `/public/${folder}/`;
}

export function fileMapper(env: string, filename: string, folder: string) {
    if (!filename) {
        return "";
    }
    // If it's already a full URL
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
        // If it starts with the dead legacy jaspilite.app domain, extract filename to re-map properly
        if (filename.includes("jaspilite.app/public/")) {
            filename = filename.slice(filename.lastIndexOf("/") + 1);
        } else {
            return filename;
        }
    }

    // Check if AWS S3 is configured
    if (process.env.AWS_S3_BUCKET_NAME) {
        const localPath = path.resolve(getPublicDir(), folder, filename);
        // If file does NOT exist in local public folder, it is hosted on S3
        if (!fs.existsSync(localPath)) {
            const region = process.env.AWS_REGION || "ap-southeast-2";
            return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${region}.amazonaws.com/uploads/${filename}`;
        }
    }

    return getStaticHome(env, folder) + filename;
}

export function getFileUploader(env: string): RequestHandler {
    const fileID = uuid();
    const destDir = path.resolve(getPublicDir(), "cache");
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    switch (env) {
        case "development":
        case "production":
            const fileStore = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, destDir);
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path.extname(file.originalname));
                }
            });
            return multer({ storage: fileStore }).single("file");
        default:
            return (req, res, next) => { next(); };
    }
}