import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { fileMapper } from "../../../general/static";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { BranchDetails } from "../../../../../model/branch/branchDetails";

export const ApiGetBranchDetails: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Branches...", req, res);
    const branchID = req.params.branch_id;
    var sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
    var queryData = [branchID];
    try {
        const branches: dbModel.branches[] = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Get Branches...", req, res);
        // To change image to full image path
        branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(PublicInfo.infoSendData({ branchdetails: branches.map((item: dbModel.branches) => new BranchDetails(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Branches...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}