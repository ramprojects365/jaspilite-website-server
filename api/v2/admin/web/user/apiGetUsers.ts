import { RequestHandler } from "express-serve-static-core";

import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { AdminUserGetFilters } from "../../../../../model/adminuser/adminUserFilters";
import { AdminUserSummary } from "../../../../../model/adminuser/adminUserSummary";

export const apiGetUsers: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Users...", req, res);
    const filters = new AdminUserGetFilters(req.query);
    // var sqlQuery = 'SELECT a.*, b.branch_name FROM adminusers AS a INNER JOIN branches AS b ON a.branch_id = b.branch_id WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT a.*, b.branch_name FROM adminusers AS a INNER JOIN branches AS b ON a.branch_id = b.branch_id WHERE ' + filters.getCondition() + ' UNION SELECT a.*, s.shop_name FROM adminusers AS a INNER JOIN shops AS s ON a.id = s.user_id WHERE ' + filters.getCondition() + ' UNION SELECT a.*, s.shop_name FROM adminusers AS a INNER JOIN shops AS s ON a.shop_id = s.shop_id WHERE '+ filters.getCondition() +' AND a.branch_id = 0';
    try {
        const users: dbModel.adminusers[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Users...", req, res);

        res.json(PublicInfo.infoSendData({ users: users.map((item: dbModel.adminusers) => new AdminUserSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Users...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}