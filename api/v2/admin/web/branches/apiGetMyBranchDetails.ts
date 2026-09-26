import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { fileMapper } from "../../../general/static";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { BranchDetails } from "../../../../../model/branch/branchDetails";

export const ApiGetMyBranchDetails: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get My Branch Details...", req, res);
    const userID = req.params.user_id;
    var sqlQuery = "SELECT b.* FROM branches AS b INNER JOIN adminusers AS a ON b.branch_id = a.branch_id WHERE a.id = ?;";
    var queryData = [userID];
    try {
        const branches: dbModel.branches[] = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Get My Branch Details...", req, res);
        // To change image to full image path
        branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(PublicInfo.infoSendData({ branchdetails: branches.map((item: dbModel.branches) => new BranchDetails(item)) }));
    } catch (error) {
        responseLogger.print("Error Get My Branch Details...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}