import { RequestHandler } from "express";
import * as fs from "fs";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { ProductUpdateFilters } from "../../../../../model/product/productFilters";
import { ProductSummary } from "../../../../../model/product/productSummary";

export const ApiUpdateProduct: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Product...", req, res);
    const productID = req.params.product_id;
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    responseLogger.print("Image..." + image, req, res);
    if (req.body.image_changed === false) {
        req.body.image = image;
        const filters = new ProductUpdateFilters(req.body);
        var sqlQuery = "UPDATE products SET " + filters.getCondition() + " WHERE product_id = ?";
        var queryData = [productID];
        try {
            const rows = await executeQuery(sqlQuery, queryData);
            if (rows.changedRows == 0) {
                responseLogger.print("Completed Update Product But no row updated...", req, res);
                res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
            } else {
                sqlQuery = "SELECT * FROM products WHERE product_id = ?";
                queryData = [productID];
                const product: dbModel.shops[] = await executeQuery(sqlQuery, queryData);
                responseLogger.print("Completed Update Product...", req, res);
                res.json(PublicInfo.infoUpdated({ product: new ProductSummary(product[0]) }));
            }
        } catch (error) {
            responseLogger.print("Error Update Product...", req, res);
            return next(ApiError.errInDatabase(error));
        }
    } else {
        req.body.image = image;
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
            const filters = new ProductUpdateFilters(req.body);
            var sqlQuery = "UPDATE products SET " + filters.getCondition() + " WHERE product_id = ?";
            var queryData = [productID];
            try {
                const rows = await executeQuery(sqlQuery, queryData);
                if (rows.changedRows == 0) {
                    responseLogger.print("Completed Update Product But no row updated...", req, res);
                    res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
                } else {
                    sqlQuery = "SELECT * FROM products WHERE product_id = ?";
                    queryData = [productID];
                    const product: dbModel.shops[] = await executeQuery(sqlQuery, queryData);
                    responseLogger.print("Completed Update Product...", req, res);
                    res.json(PublicInfo.infoUpdated({ product: new ProductSummary(product[0]) }));
                }
            } catch (error) {
                responseLogger.print("Error Update Product...", req, res);
                return next(ApiError.errInDatabase(error));
            }
        });
    }
}