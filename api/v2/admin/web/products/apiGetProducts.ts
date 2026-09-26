import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { ProductSummary } from "../../../../../model/product/productSummary";
import { ProductGetFilters } from "../../../../../model/product/productFilters";
import { fileMapper } from "../../../general/static";

export const ApiGetProducts: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Products...", req, res);
    const filters = new ProductGetFilters(req.query);
    var sqlQuery = 'SELECT p.product_id, p.name, p.company, p.weight, p.sku, p.category_id, c.category_name, image, description FROM products as p INNER JOIN product_category as c ON c.category_id = p.category_id WHERE ' + filters.getCondition();
    try {
        const products: dbModel.product[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Products...", req, res);
        // To change image to full image path
        products.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'product_images').toString());
        res.json(PublicInfo.infoSendData({ products: products.map((item: dbModel.product) => new ProductSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Products...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}