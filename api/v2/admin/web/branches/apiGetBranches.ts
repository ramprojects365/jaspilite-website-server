import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { BranchGetFilters } from "../../../../../model/branch/branchFilters";
import { BranchSummary } from "../../../../../model/branch/branchSummary";
import { fileMapper } from "../../../general/static";

export const ApiGetBranches: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Branches...", req, res);
    const filters = new BranchGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM branches WHERE ' + filters.getCondition();
    try {
        const branches: dbModel.branches[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Branches...", req, res);
        // To change image to full image path
        branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(PublicInfo.infoSendData({ branches: branches.map((item: dbModel.branches) => new BranchSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Branches...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}