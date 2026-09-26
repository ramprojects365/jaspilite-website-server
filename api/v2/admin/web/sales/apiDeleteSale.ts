import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiDeleteSale: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Sale...", req, res);
    const salesID = req.params.sales_id;
    var sqlQuery = "UPDATE sales SET sales_status = 'Cancelled' WHERE sales_id = ?; INSERT INTO sales_status(sales_id,status) VALUES(?, 'Cancelled') ON DUPLICATE KEY UPDATE status = VALUES(status);";
    var queryData = [salesID, salesID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Sale But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Sale...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: salesID }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Sale...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}