import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { BranchGetFilters } from "../../../../../model/branch/branchFilters";
import { BranchCategorySummary, BranchSummary } from "../../../../../model/branch/branchSummary";
import { fileMapper } from "../../../general/static";

export const ApiGetBranchesCategories: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Branches Category...", req, res);
    const filters = new BranchGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM branches_category';
    try {
        const branches: dbModel.branchCategory[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Branches Category...", req, res);
        // To change image to full image path
        // branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(PublicInfo.infoSendData({ categories: branches.map((item: dbModel.branchCategory) => new BranchCategorySummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Branches Category...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}