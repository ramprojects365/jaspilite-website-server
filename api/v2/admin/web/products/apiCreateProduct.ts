import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";

import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import * as dbModel from "../../../../../db/model_created";
import { ProductSummary } from "../../../../../model/product/productSummary";
import { fileMapper, getPublicDir } from "../../../general/static";

export const ApiCreateProduct: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Create Product...", req, res);
    const requiredFields = ["category_id", "company", "name", "image"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    // console.log("IMMAGEEEEEEEEE " + req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length))
    const newProduct: dbModel.product = {
        product_id: 0,
        category_id: req.body.category_id || 0,
        company: req.body.company || "",
        name: req.body.name || "",
        image: image || "",
        description: req.body.description || "",
        weight: req.body.weight || 0.00,
        sku: req.body.sku || null,
    };
    const publicDir = getPublicDir();
    const cachePath = path.resolve(publicDir, 'cache', image);
    const destPath = path.resolve(publicDir, 'product_images', image);
    if (fs.existsSync(cachePath)) {
        try {
            fs.copyFileSync(cachePath, destPath);
            fs.unlinkSync(cachePath);
        } catch (e) {
            console.warn("Image copy warning:", e);
        }
    }
    var sqlQuery = "INSERT INTO products (category_id, company, name, image, description, weight, sku) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var queryData = [newProduct.category_id, newProduct.company, newProduct.name, newProduct.image, newProduct.description, newProduct.weight, newProduct.sku];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        newProduct.product_id = rows.insertId;
        newProduct.image = fileMapper(req.app.get("env"), newProduct.image, 'product_images').toString();
        responseLogger.print("Completed Create Product...", req, res);
        res.json(PublicInfo.infoCreated({ product: new ProductSummary(newProduct) }));
    } catch (error) {
        responseLogger.print("Error Create Product...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}