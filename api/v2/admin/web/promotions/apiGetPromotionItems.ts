import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { PromotionItemsGetFilters } from "../../../../../model/promotions/promotionsFilter";
import { PromotionItemSummary } from "../../../../../model/promotions/promotionSummary";

export const ApiGetPromotionItems: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Promotion Items...", req, res);
    const filters = new PromotionItemsGetFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT pi.*, si.item_price, p.name, p.image FROM promotion_items AS pi INNER JOIN shop_items as si ON pi.shop_items_id = si.item_id INNER JOIN products as p ON si.product_id = p.product_id WHERE ' + filters.getCondition();
    try {
        const promotions: dbModel.PromotionItem[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Promotion Items...", req, res);
        res.json(PublicInfo.infoSendData({ promotions: promotions.map((item: dbModel.PromotionItem) => new PromotionItemSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Promotions Items..", req, res);
        return next(ApiError.errInDatabase(error));
    }
}