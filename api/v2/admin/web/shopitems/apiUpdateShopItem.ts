import { RequestHandler } from "express-serve-static-core";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { ShopItemSummary } from "../../../../../model/shopitems/shopItemSummary";
import { ShopItemUpdateFilters } from "../../../../../model/shopitems/shopItemFilters";

export const ApiUpdateShopItem: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Shop Items...", req, res);
    const itemID = req.params.item_id;
    const branchIds = req.body.branch_ids;
    const productId = req.body.product_id;
    const filters = new ShopItemUpdateFilters(req.body);
    var sqlQuery = "UPDATE shop_items SET " + filters.getCondition() + " WHERE product_id = ? AND branch_id in (?);";
    var queryData = [productId, branchIds];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Shop Items But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM shop_items WHERE item_id = ?";
            queryData = [itemID];
            const product: dbModel.shops[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Shop Items...", req, res);
            res.json(PublicInfo.infoUpdated({ product: new ShopItemSummary(product[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Shop Items...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}