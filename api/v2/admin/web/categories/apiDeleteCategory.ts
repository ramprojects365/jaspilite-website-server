import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiDeleteCategory: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Category...", req, res);
    const categoryID = req.params.category_id;
    var sqlQuery = "DELETE FROM product_category WHERE category_id = ?";
    var queryData = [categoryID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Category But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Category...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: categoryID }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Category...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}