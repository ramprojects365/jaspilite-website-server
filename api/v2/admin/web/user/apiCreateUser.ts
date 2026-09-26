import { RequestHandler } from "express-serve-static-core";
import * as bcrypt from 'bcrypt';

import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { AdminUserSummary } from "../../../../../model/adminuser/adminUserSummary";
import { saltRounds } from "../../../../../config/server/bcript";

export const apiCreateUser: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Create User...", req, res);
    var sqlQuery = '';
    var queryData: any[];
    // Check if all required fields are there
    const requiredFields = ["user_type", "displayName", "email", "password"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newUser: dbModel.adminusers = {
        id: 0,
        status: 'active',
        user_type: req.body.user_type || "",
        shop_id: req.body.shop_id || "",
        branch_id: req.body.branch_id || "",
        displayName: req.body.displayName || "",
        email: req.body.email || "",
        password: req.body.password || "",
    };
    // Check if data is not empty
    if (newUser.user_type == "" || newUser.displayName == "" || newUser.email == "" || newUser.password == "") {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    } else if (newUser.user_type === 'sadmin') {
        sqlQuery = "INSERT INTO adminusers (user_type, displayName, email, password) VALUES ('sadmin', ?, ?, ?);";
        queryData = [newUser.displayName, newUser.email];
    } else if (newUser.user_type === 'nadmin') {
        sqlQuery = "INSERT INTO adminusers (user_type, displayName, email, password) VALUES ('nadmin', ?, ?, ?);";
        queryData = [newUser.displayName, newUser.email];
    } else if (newUser.user_type === 'manager') {
        sqlQuery = "INSERT INTO adminusers (user_type, shop_id, branch_id, displayName, email, password) VALUES ('manager', ?, ?, ?, ?, ?);";
        queryData = [newUser.shop_id, newUser.branch_id, newUser.displayName, newUser.email];
    } else if (newUser.user_type === 'employee') {
        sqlQuery = "INSERT INTO adminusers (user_type, shop_id, branch_id, displayName, email, password) VALUES ('employee', ?, ?, ?, ?, ?);";
        queryData = [newUser.shop_id, newUser.branch_id, newUser.displayName, newUser.email];
    } else if (newUser.user_type === 'api') {
        sqlQuery = "INSERT INTO adminusers (user_type, shop_id, branch_id, displayName, email, password) VALUES ('employee', ?, ?, ?, ?, ?);";
        queryData = [newUser.shop_id, newUser.branch_id, newUser.displayName, newUser.email];
    }else if (newUser.user_type === 'padmin') {
        sqlQuery = "INSERT INTO adminusers (user_type, displayName, email, password) VALUES ('padmin', ?, ?, ?);";
        queryData = [newUser.displayName, newUser.email];
    } else {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
        try {
            queryData.push(hash);
            const rows = await executeQuery(sqlQuery, queryData);
            newUser.id = rows.insertId;
            responseLogger.print("Completed Create User...", req, res);
            res.json(PublicInfo.infoCreated({ admin_user: new AdminUserSummary(newUser) }));
        // } catch (error: any) {
        } catch (error) {
            responseLogger.print("Error Create User...", req, res);
            // console.log(error.code);
            // if (error.code === 'ER_DUP_ENTRY') {
            //     return next(ApiError.errInDatabaseDuplicate(error));
            // }
            return next(ApiError.errInDatabase(error));
        }
    })
} 