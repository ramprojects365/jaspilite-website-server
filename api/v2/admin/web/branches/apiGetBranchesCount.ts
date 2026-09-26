import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery, mySqlPool } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiGetBranchesCount: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Branches Count...", req, res);
    if (req.query.user_id) {
        var sqlQuery = 'SELECT count(s.shop_name) AS branch_count FROM shops AS s INNER JOIN branches AS b ON s.shop_id = b.shop_id INNER JOIN adminusers AS a ON (s.user_id = a.id OR s.shop_id = a.shop_id) WHERE a.id = ' + mySqlPool.escape(req.query.user_id);
    } else {
        var sqlQuery = 'SELECT count(branch_id) as branch_count FROM branches';
    }
    try {
        const branchCount = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Branches Count...", req, res);
        responseLogger.print("Completed Get Branches count..." + branchCount[0].branch_count, req, res);
        res.json(PublicInfo.infoSendData({ branch_count: branchCount[0].branch_count }));
    } catch (error) {
        responseLogger.print("Error Get Branches Count...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}