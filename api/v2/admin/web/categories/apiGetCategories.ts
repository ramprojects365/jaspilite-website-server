import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { CategorySummary } from "../../../../../model/categories/categorySummary";

export const ApiGetCategories: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Categories...", req, res);
    var sqlQuery = 'SELECT * FROM product_category';
    try {
        const categories: dbModel.category[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Categories...", req, res);
        res.json(PublicInfo.infoSendData({ categories: categories.map((item: dbModel.category) => new CategorySummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Categories...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}