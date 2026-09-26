import { RequestHandler } from "express";
import * as fs from "fs";

import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import * as dbModel from "../../../../../db/model_created";
import { ProductSummary } from "../../../../../model/product/productSummary";

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
    fs.copyFile('public/cache/' + image, 'public/product_images/' + image, async (err) => {
        if (err) {
            return next(ApiError.errCopyImageFailed({ "details": "Image copy failed" }));
        }
        fs.unlink('public/cache/' + image, (err) => {
            if (err) {
                responseLogger.print("Image Delete from cache failed...", req, res);
                return
            }
            responseLogger.print("Image Delete from cache sucess...", req, res);
        });
        responseLogger.print('Image was moved.........', req, res);
        var sqlQuery = "INSERT INTO products (category_id, company, name, image, description, weight, sku) VALUES (?, ?, ?, ?, ?, ?, ?)";
        var queryData = [newProduct.category_id, newProduct.company, newProduct.name, newProduct.image, newProduct.description, newProduct.weight, newProduct.sku];
        try {
            const rows = await executeQuery(sqlQuery, queryData);
            newProduct.product_id = rows.insertId;
            responseLogger.print("Completed Create Product...", req, res);
            res.json(PublicInfo.infoCreated({ product: new ProductSummary(newProduct) }));
        } catch (error) {
            responseLogger.print("Error Create Product...", req, res);
            return next(ApiError.errInDatabase(error));
        }
    });
}