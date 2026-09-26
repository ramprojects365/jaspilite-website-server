import { CustomRquestHandler } from "../../../../../model/express";
import * as jwt from 'jsonwebtoken';

import { sessionTokenSecret } from "../../../../../config/server/sessionConfig";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { adminusers } from "../../../../../db/model_created";

export const apiSessionVerify: CustomRquestHandler = (req, res, next) => {
    // console.log("TOKEN " + req.headers.authorization)
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, sessionTokenSecret, async (err, decoded: any) => {
            if (err) {
                next(ApiError.errUnauthorizedError());
            } else {
                // TODO Check if Token has expired.
                const adminUserId = decoded.userID;
                var sqlQuery = "SELECT id, status, user_type, shop_id, branch_id, displayName, email, password FROM adminusers WHERE id = ? AND status = 'active'";
                var queryData = [adminUserId];
                try {
                    const result = await executeQuery(sqlQuery, queryData);
                    const userFromDB: adminusers = result[0];
                    if (userFromDB != undefined) {
                        req.user = userFromDB;
                        responseLogger.print("User - " + req.user.displayName, req, res);
                        next();
                    } else {
                        next();
                    }
                } catch (error) {
                    responseLogger.print("Error Fetching User in admin web api Session Verify...", req, res);
                    return next(ApiError.errInDatabase(error));
                }
            }
        })
    } else {
        next();
    }
}