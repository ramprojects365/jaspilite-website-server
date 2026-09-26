import { RequestHandler } from "express";
import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { SaleStatus } from "../../../../../model/sales/saleStatus";

export const ApiUpdateSalesStatus: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Sales Status...", req, res);
    const sales_id = req.params.sales_id;
    const status = req.body.status;
    console.log(status);

    if (status == "Accepted" || status == "Delivered" || status == "Cancelled" || status == 'Delivering') {
        // newStatus = "Accepted";
        // Continue...
    } else {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : Proper Status" }));
    }

    var sqlQuery = "INSERT INTO sales_status(sales_id, status) VALUES(?, ?)";
    var queryData = [sales_id, status];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Sales Status But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM sales_status WHERE sales_id = ?";
            queryData = [sales_id];
            const status: dbModel.saleStatus[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Sales Status...", req, res);
            res.json(PublicInfo.infoUpdated({ status: status.map((item: dbModel.saleStatus) => new SaleStatus(item)) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Sales Items...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}