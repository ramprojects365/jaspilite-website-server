import { RequestHandler } from "express-serve-static-core";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { ShopGetCountFilters } from "../../../../../model/shop/shopCountFilters";

export const ApiGetShopsCount: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Shops Count...", req, res);
    const filters = new ShopGetCountFilters(req.query);
    var sqlQuery = 'SELECT count(s.shop_id) as shops_count FROM shops AS s INNER JOIN adminusers AS a ON (s.user_id = a.id OR s.shop_id = a.shop_id) WHERE ' + filters.getCondition();
    try {
        const shopsCount = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Shops Count...", req, res);
        responseLogger.print("Completed Get Shops count..." + shopsCount[0].shops_count, req, res);
        res.json(PublicInfo.infoSendData({ shops_count: shopsCount[0].shops_count }));
    } catch (error) {
        responseLogger.print("Error Get Shops Count...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}