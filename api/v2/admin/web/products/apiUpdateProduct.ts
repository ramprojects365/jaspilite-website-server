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
    let image = req.body.image || "";
    if (image.includes("/")) {
        image = image.slice(image.lastIndexOf("/") + 1);
    }
    responseLogger.print("Image..." + image, req, res);

    if (req.body.image_changed !== false && image) {
        const cachePath = 'public/cache/' + image;
        const destPath = 'public/product_images/' + image;
        if (fs.existsSync(cachePath)) {
            try {
                fs.copyFileSync(cachePath, destPath);
                fs.unlinkSync(cachePath);
                responseLogger.print('Image was moved from cache to product_images', req, res);
            } catch (copyErr) {
                console.warn('Image move warning (non-fatal):', copyErr);
            }
        }
    }

    req.body.image = image;
    const filters = new ProductUpdateFilters(req.body);
    const sqlQuery = "UPDATE products SET " + filters.getCondition() + " WHERE product_id = ?";
    const queryData = [productID];

    try {
        await executeQuery(sqlQuery, queryData);
        const selectQuery = "SELECT * FROM products WHERE product_id = ?";
        const selectData = [productID];
        const product: dbModel.shops[] = await executeQuery(selectQuery, selectData);
        responseLogger.print("Completed Update Product...", req, res);
        res.json(PublicInfo.infoUpdated({ product: new ProductSummary(product[0]) }));
    } catch (error) {
        responseLogger.print("Error Update Product...", req, res);
        return next(ApiError.errInDatabase(error));
    }
};