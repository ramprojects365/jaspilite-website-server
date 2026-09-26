import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { SalesItemUpdateFilters } from "../../../../../model/sales/salesFilter";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { SaleItem } from "../../../../../model/sales/saleItem";

export const ApiUpdateSaleItem: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Sales Items...", req, res);
    const sales_details_id = req.params.sales_details_id;
    const filters = new SalesItemUpdateFilters(req.body);
    var sqlQuery = "UPDATE sales_details SET " + filters.getCondition() + " WHERE sales_details_id = ?; UPDATE sales SET total = ? WHERE sales_id = ?;";
    var queryData = [sales_details_id, req.body.total, req.body.sales_id];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Sales Items But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM sales_details WHERE sales_details_id = ?";
            queryData = [sales_details_id];
            const product: dbModel.shops[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Sales Items...", req, res);
            res.json(PublicInfo.infoUpdated({ product: new SaleItem(product[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Sales Items...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}