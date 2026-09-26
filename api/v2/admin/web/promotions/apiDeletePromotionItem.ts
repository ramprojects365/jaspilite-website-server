import { RequestHandler } from "express";
const moment = require('moment');
import uuid from "uuid/v4";

import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { responseLogger } from "../../../general/responseLogs";
import { PromotionItemSummary } from "../../../../../model/promotions/promotionSummary";

export const ApiDeletePromotionItem: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Promotion Item...", req, res);
    const itemId = req.params.item_id;
    var sqlQuery = "DELETE FROM promotion_items WHERE promo_items_id = ?;";
    var queryData = [itemId];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Promotion Item But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Promotion Item...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: itemId }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Promotion Item...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}