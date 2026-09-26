import { RequestHandler } from "express-serve-static-core";

import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { BranchSummary } from "../../../../../model/branch/branchSummary"
import { BranchGetFilters } from "../../../../../model/branch/branchFilters";
import { responseLogger } from "../../../general/responseLogs";

export const apiGetBranches: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Branches...", req, res);
    const filters = new BranchGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM branches WHERE ' + filters.getCondition() + ' AND active = 1';
    try {
        const branches = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Branches...", req, res);
        res.json(PublicInfo.infoSendData({ shops: branches.map((item: any) => new BranchSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Branches...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}