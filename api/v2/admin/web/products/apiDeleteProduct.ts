import { RequestHandler } from "express-serve-static-core";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiDeleteProducts: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Product...", req, res);
    const productID = req.params.product_id;
    var sqlQuery = "DELETE FROM products WHERE product_id = ?";
    var queryData = [productID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Product But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Product...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: productID }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Product...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}