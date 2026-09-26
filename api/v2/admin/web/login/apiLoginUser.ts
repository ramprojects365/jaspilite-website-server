import { RequestHandler } from "express-serve-static-core";
import * as bcrypt from 'bcrypt';

import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { AdminUserSummary } from "../../../../../model/adminuser/adminUserSummary";
import { CustomRquestHandler } from "../../../../../model/express";
import { apiSessionGenerate, apiTokenGenerate } from "./apiSessionGenerate";

export const apiLoginUser: CustomRquestHandler = async (req, res, next) => {
    responseLogger.print("Calling Login User...", req, res);
    const requiredFields = ["email", "password"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    if (req.body.email == "" || req.body.password == "") {
        return next(ApiError.emptyUidOrPass({ "details": "User id or password cannot be empty" }))
    }
    const user = {
        email: req.body.email || "",
        password: req.body.password || ""
    };
    var sqlQuery = "SELECT id, status, user_type, displayName, email, password FROM adminusers WHERE email = ?";
    var queryData = [user.email];
    try {
        const result = await executeQuery(sqlQuery, queryData);
        const userFromDB = result[0]
        responseLogger.print("User Found ......", req, res);
        if (userFromDB != undefined) {
            // Check if user is active or not
            if (userFromDB.status == 'active') {
                bcrypt.compare(user.password, userFromDB.password, (err, resp) => {
                    if (resp == true) {
                        // passwords match
                        responseLogger.print("Password Matched ...", req, res);
                        // TODO Create Session
                        req.user = userFromDB;
                        apiSessionGenerate(req, res, next);
                    } else {
                        // passwords did not match
                        return next(ApiError.loginFailed());
                    }
                })
            } else {
                return next(ApiError.userNotActive());
            }
        } else {
            // Email does not exist
            return next(ApiError.loginFailed());
        }
    } catch (error) {
        responseLogger.print("Error Logging In User... " + error, req, res);
        return next(ApiError.errInDatabase(error));
    }
} 

export const tokenLoginUser: CustomRquestHandler = async (req, res, next) => {
    console.log(req.body);
    responseLogger.print("Calling Api User...", req, res);
    const requiredFields = ["username", "password"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    if (req.body.email == "" || req.body.password == "") {
        return next(ApiError.emptyUidOrPass({ "details": "User id or password cannot be empty" }))
    }
    const user = {
        email: req.body.username || "",
        password: req.body.password || ""
    };
    var sqlQuery = "SELECT id, status, user_type, displayName, email, password FROM adminusers WHERE email = ?";
    var queryData = [user.email];
    try {
        const result = await executeQuery(sqlQuery, queryData);
        const userFromDB = result[0]
        responseLogger.print("User Found ......", req, res);
        if (userFromDB != undefined) {
            // Check if user is active or not
            if (userFromDB.status == 'active') {
                bcrypt.compare(user.password, userFromDB.password, (err, resp) => {
                    if (resp == true) {
                        // passwords match
                        responseLogger.print("Password Matched ...", req, res);
                        // TODO Create Session
                        req.user = userFromDB;
                        apiTokenGenerate(req, res, next);
                    } else {
                        // passwords did not match
                        return next(ApiError.loginFailed());
                    }
                })
            } else {
                return next(ApiError.userNotActive());
            }
        } else {
            // Email does not exist
            return next(ApiError.loginFailed());
        }
    } catch (error) {
        responseLogger.print("Error Logging In Api... " + error, req, res);
        return next(ApiError.errInDatabase(error));
    }
} 