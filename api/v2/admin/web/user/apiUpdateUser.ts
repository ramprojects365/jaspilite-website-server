import { RequestHandler } from "express-serve-static-core";
import * as bcrypt from 'bcrypt';

import { responseLogger } from "../../../general/responseLogs";
import { UserUpdateFilters } from "../../../../../model/adminuser/adminUserFilters";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { saltRounds } from "../../../../../config/server/bcript";
import * as dbModel from "../../../../../db/model_created";
import { AdminUserSummary } from "../../../../../model/adminuser/adminUserSummary";

export const apiUpdateUser: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update User...", req, res);
    const userID = req.params.id;
    const password = req.body.password || "";
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        const filters = new UserUpdateFilters(req.body, req.body.password, hash);
        var sqlQuery = "UPDATE adminusers SET " + filters.getCondition() + " WHERE id = ?";
        var queryData = [userID];
        try {
            const rows = await executeQuery(sqlQuery, queryData);
            if (rows.changedRows == 0) {
                responseLogger.print("Completed Update User But no row updated...", req, res);
                res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
            } else {
                sqlQuery = "SELECT id, displayName, user_type, email, status FROM adminusers WHERE id = ?";
                queryData = [userID];
                const user: dbModel.adminusers[] = await executeQuery(sqlQuery, queryData);
                responseLogger.print("Completed Update Shop...", req, res);
                res.json(PublicInfo.infoUpdated({ user: new AdminUserSummary(user[0]) }));
            }
        } catch (error) {
            responseLogger.print("Error Update Shop...", req, res);
            return next(ApiError.errInDatabase(error));
        }
    });
}