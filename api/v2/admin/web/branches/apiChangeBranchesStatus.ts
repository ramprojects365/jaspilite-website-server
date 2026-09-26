import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { BranchDetails } from "../../../../../model/branch/branchDetails";

export const ApiChangeBranchesStatus: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Branch Status...", req, res);
    const requiredFields = ["status"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const branchID = req.params.branch_id;
    const status = req.body.status;
    var sqlQuery = "UPDATE branches SET active = ? WHERE branch_id = ?";
    var queryData = [status, branchID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Branch Status But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
            queryData = [branchID];
            const branches: dbModel.branches[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Branch Status...", req, res);
            res.json(PublicInfo.infoUpdated({ branch: new BranchDetails(branches[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Branch...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}