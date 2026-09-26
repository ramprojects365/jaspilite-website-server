import { RequestHandler } from "express-serve-static-core";

import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { ShopUpdateFilters } from "../../../../../model/shop/shopFilters";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { ShopSummary } from "../../../../../model/shop/shopSummary";

export const apiUpdateShop: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Shop...", req, res);
    const shopID = req.params.shop_id;
    const filters = new ShopUpdateFilters(req.body);
    var sqlQuery = "UPDATE shops SET " + filters.getCondition() + " WHERE shop_id = ?";
    var queryData = [shopID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Shop But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT shop_id, shop_name, shop_addr FROM shops WHERE shop_id = ?";
            queryData = [shopID];
            const shop: dbModel.shops[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Shop...", req, res);
            res.json(PublicInfo.infoUpdated({ shop: new ShopSummary(shop[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}