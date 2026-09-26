import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiDeleteSalesItem: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Sales Item...", req, res);
    const salesDetailsID = req.params.sales_details_id;
    var sqlQuery = "DELETE FROM sales_details WHERE sales_details_id = ?; UPDATE sales SET total = ? WHERE sales_id = ?;";
    var queryData = [salesDetailsID, req.params.total, req.params.sales_id];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Sales Item But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Sales Item...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: salesDetailsID }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Sales Item...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}