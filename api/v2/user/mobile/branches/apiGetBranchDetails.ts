import { RequestHandler } from "express-serve-static-core";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { BranchGetFilters } from "../../../../../model/branch/branchFilters";
import { BranchDetails } from "../../../../../model/branch/branchDetails";

export const apiGetBranchDetails: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Branch Details...", req, res);
    const branchId = req.params.branch_id;
    var sqlQuery = 'SELECT * FROM branches WHERE branch_id = ' + branchId;
    try {
        const branch = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Branch Details...", req, res);
        res.json(PublicInfo.infoSendData({ shop: branch.map((item: any) => new BranchDetails(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Branch Details...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}