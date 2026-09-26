import { CustomRquestHandler } from "../../../../../model/express";
import * as jwt from "jsonwebtoken";
import { refreshTokenSecret, sessionTokenLifetime, sessionTokenSecret } from "../../../../../config/server/sessionConfig";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { adminusers } from "../../../../../db/model_created";

export const apiAdminRefreshToken: CustomRquestHandler = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken) {
        jwt.verify(refreshToken, refreshTokenSecret, async (err: any, decoded: any) => {
            if (err) {
                next(ApiError.errUnauthorizedError());
            } else {
                // TODO Check if Token has expired.
                const adminUserId = decoded.userID;
                var sqlQuery = "SELECT id, status, user_type, displayName, email, password FROM adminusers WHERE id = ? AND status = 'active'";
                var queryData = [adminUserId];
                try {
                    const result = await executeQuery(sqlQuery, queryData);
                    const userFromDB: adminusers = result[0];
                    if (userFromDB != undefined) {
                        req.user = userFromDB;
                        responseLogger.print("User - " + req.user.displayName, req, res);
                        const token = jwt.sign({ userID: req.user.id }, sessionTokenSecret, { expiresIn: sessionTokenLifetime });
                        res.json(PublicInfo.infoSendData({ "loggedIn": true, "token": token }));
                    } else {
                        next();
                    }
                } catch (error) {
                    responseLogger.print("Error Fetching User in admin web api Refresh Token...", req, res);
                    return next(ApiError.errInDatabase(error));
                }
            }
        });
    } else {
        next(ApiError.errMissingBody);
    }
}