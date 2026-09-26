import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { CategoryUpdateFilters } from "../../../../../model/categories/categoryFilters";
import { CategorySummary } from "../../../../../model/categories/categorySummary";
import * as dbModel from "../../../../../db/model_created";

export const ApiUpdateCategory: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Category...", req, res);
    const categoryID = req.params.category_id;
    const filters = new CategoryUpdateFilters(req.body);
    var sqlQuery = "UPDATE product_category SET " + filters.getCondition() + " WHERE category_id = ?";
    var queryData = [categoryID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Category But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM product_category WHERE category_id = ?";
            queryData = [categoryID];
            const category: dbModel.category[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Category...", req, res);
            res.json(PublicInfo.infoUpdated({ category: new CategorySummary(category[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Category...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}