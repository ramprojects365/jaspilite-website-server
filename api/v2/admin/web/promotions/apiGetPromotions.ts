import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { PromotionsGetFilters } from "../../../../../model/promotions/promotionsFilter";
import { PromotionSummary } from "../../../../../model/promotions/promotionSummary";

export const ApiGetPromotions: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Promotions...", req, res);
    const filters = new PromotionsGetFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT * FROM promotions WHERE ' + filters.getCondition();
    try {
        const promotions: dbModel.Promotions[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Promotions...", req, res);
        res.json(PublicInfo.infoSendData({ promotions: promotions.map((item: dbModel.Promotions) => new PromotionSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Promotions...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}