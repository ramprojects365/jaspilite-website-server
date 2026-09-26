import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiDeleteSalesStatus: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Sales Status...", req, res);
    const sales_id = req.params.sales_id;
    const status_id = req.params.status_id;
    const status = req.params.status;
    let newStatus = '';
    if (status == "Delivered" || status == "Cancelled" || status == 'Delivering') {
        newStatus = "Accepted";
    } else if (status == "Accepted") {
        newStatus = "Ordered";
    } else {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : Proper Status" }));
    }
    var sqlQuery = "DELETE FROM sales_status WHERE status_id = ? AND sales_id = ? AND status = ?; UPDATE sales SET sales_status = ? WHERE sales_id = ?;";
    var queryData = [status_id, sales_id, status, newStatus, sales_id];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        console.log(rows);
        if (rows[0].affectedRows == 0) {
            responseLogger.print("Completed Delete Sales Status But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Sales Status...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: status_id }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Sales Status...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}