import { RequestHandler } from "express-serve-static-core";

import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { ShopSummary } from "../../../../../model/shop/shopSummary";
import { ShopGetFilters } from "../../../../../model/shop/shopFilters";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";

export const apiGetShops: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Shops...", req, res);
    const filters = new ShopGetFilters(req.query);
    var sqlQuery = 'SELECT s.shop_id, s.user_id, s.shop_name, s.shop_addr FROM shops as s INNER JOIN adminusers as a ON (s.user_id = a.id OR s.shop_id = a.shop_id) WHERE ' + filters.getCondition() + ' group by s.shop_id, s.user_id, s.shop_name, s.shop_addr;';
    try {
        let shops: dbModel.shops[] = await executeQuery(sqlQuery);
        // Fallback: If no shops matched user-specific filter, check if the requesting user or queried user is 'sadmin'
        if (!shops || shops.length === 0) {
            let isSadmin = (req as any).user?.user_type === 'sadmin';
            if (!isSadmin && req.query.user_id) {
                const userCheck: any[] = await executeQuery("SELECT user_type FROM adminusers WHERE id = ?", [req.query.user_id]);
                if (userCheck && userCheck.length > 0 && userCheck[0].user_type === 'sadmin') {
                    isSadmin = true;
                }
            }
            if (isSadmin) {
                const allShopsQuery = 'SELECT s.shop_id, s.user_id, s.shop_name, s.shop_addr FROM shops as s ORDER BY s.shop_name ASC';
                shops = await executeQuery(allShopsQuery);
            }
        }
        responseLogger.print("Completed Get Shops...", req, res);
        res.json(PublicInfo.infoSendData({ shops: shops.map((item: dbModel.shops) => new ShopSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Shops...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}