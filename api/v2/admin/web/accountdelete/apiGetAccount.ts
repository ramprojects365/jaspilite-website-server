import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { BranchSummary } from "../../../../../model/branch/branchSummary";
import { fileMapper } from "../../../general/static";
import { UserGetFilters } from "../../../../../model/user/userFilters";
import { UserSummary } from "../../../../../model/user/userSummary";

export const apiGetAccount: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get User Account for delete...", req, res);
    const filters = new UserGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM users WHERE ' + filters.getCondition();
    try {
        const user: dbModel.user[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get User Account for delete...", req, res);
        res.json(PublicInfo.infoSendData({ user: user.map((item: dbModel.user) => new UserSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get User Account for delete...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}