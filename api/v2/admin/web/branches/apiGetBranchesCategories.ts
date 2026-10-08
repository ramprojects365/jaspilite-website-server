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
        let branches: dbModel.branchCategory[] = await executeQuery(sqlQuery);
        if (!branches || branches.length === 0) {
            try {
                await executeQuery(`
                    INSERT INTO branches_category (category_id, category_name) VALUES
                    (1, 'Groceries'),
                    (2, 'Restaurants'),
                    (3, 'Beauty'),
                    (4, 'Electronics'),
                    (5, 'Charity'),
                    (6, 'Jewellery')
                    ON DUPLICATE KEY UPDATE category_name = VALUES(category_name)
                `);
                branches = await executeQuery(sqlQuery);
            } catch (seedErr) {
                console.error("Auto-seed branches_category warning:", seedErr);
            }
        }
        responseLogger.print("Completed Get Branches Category...", req, res);
        res.json(PublicInfo.infoSendData({ categories: (branches || []).map((item: dbModel.branchCategory) => new BranchCategorySummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Branches Category...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}