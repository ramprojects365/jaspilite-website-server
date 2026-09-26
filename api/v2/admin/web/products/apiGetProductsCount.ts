import { RequestHandler } from "express-serve-static-core";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiGetProductsCount: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Products Count...", req, res);
    var sqlQuery = 'SELECT count(product_id) as products_count FROM products;';
    try {
        const productsCount = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Products Count...", req, res);
        responseLogger.print("Completed Get Products count..." + productsCount[0].products_count, req, res);
        res.json(PublicInfo.infoSendData({ products_count: productsCount[0].products_count }));
    } catch (error) {
        responseLogger.print("Error Get Products Count...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}