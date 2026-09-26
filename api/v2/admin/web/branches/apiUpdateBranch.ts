import { RequestHandler } from "express-serve-static-core";
import * as fs from "fs";

import { executeQuery } from "../../../../../db/db";
import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { BranchUpdateFilters } from "../../../../../model/branch/branchFilters";
import { BranchDetails } from "../../../../../model/branch/branchDetails";
import { fileMapper } from "../../../general/static";

export const ApiUpdateBranch: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Branch...", req, res);
    const branchID = req.params.branch_id;
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    responseLogger.print("image..." + image, req, res);
    responseLogger.print("req.body.image..." + req.body.image, req, res);
    responseLogger.print("req.body.image_changed..." + req.body.image_changed, req, res);
    if (req.body.image_changed === false) {
        //Image has not changed
        req.body.image = image;
        const filters = new BranchUpdateFilters(req.body);
        var sqlQuery = "UPDATE branches SET " + filters.getCondition() + " WHERE branch_id = ?";
        var queryData = [branchID];
        try {
            const rows = await executeQuery(sqlQuery, queryData);
            if (rows.changedRows == 0) {
                responseLogger.print("Completed Update Branch But no row updated...", req, res);
                res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
            } else {
                sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
                queryData = [branchID];
                const branches: dbModel.branches[] = await executeQuery(sqlQuery, queryData);
                // To change image to full image path
                branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
                responseLogger.print("Completed Update Branch...", req, res);
                res.json(PublicInfo.infoUpdated({ branch: new BranchDetails(branches[0]) }));
            }
        } catch (error) {
            responseLogger.print("Error Update Branch...", req, res);
            return next(ApiError.errInDatabase(error));
        }
    } else {
        //Image changed
        req.body.image = image;
        fs.copyFile('public/cache/' + image, 'public/shop_images/' + image, async (err) => {
            if (err) {
                return next(ApiError.errCopyImageFailed({ "details": "Image copy failed" }));
            }
            fs.unlink('public/cache/' + image, (err) => {
                if (err) {
                    responseLogger.print("Image Delete from cache failed...", req, res);
                    return
                }
                responseLogger.print("Image Delete from cache sucess...", req, res);
            });
            responseLogger.print('Image was moved.........', req, res);
            const filters = new BranchUpdateFilters(req.body);
            var sqlQuery = "UPDATE branches SET " + filters.getCondition() + " WHERE branch_id = ?";
            var queryData = [branchID];
            try {
                const rows = await executeQuery(sqlQuery, queryData);
                if (rows.changedRows == 0) {
                    responseLogger.print("Completed Update Branch But no row updated...", req, res);
                    res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
                } else {
                    sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
                    queryData = [branchID];
                    const branches: dbModel.branches[] = await executeQuery(sqlQuery, queryData);
                    // To change image to full image path
                    branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
                    responseLogger.print("Completed Update Branch...", req, res);
                    res.json(PublicInfo.infoUpdated({ branch: new BranchDetails(branches[0]) }));
                }
            } catch (error) {
                responseLogger.print("Error Update Branch...", req, res);
                return next(ApiError.errInDatabase(error));
            }
        });
    }

}