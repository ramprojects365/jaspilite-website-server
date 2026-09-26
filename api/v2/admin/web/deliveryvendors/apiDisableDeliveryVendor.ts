import { RequestHandler } from "express-serve-static-core";

import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { ShopUpdateFilters } from "../../../../../model/shop/shopFilters";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { ShopSummary } from "../../../../../model/shop/shopSummary";
import { deliveryShops } from "../../../../../model/deliveryshops/deliveryShops";

export const apiDisableDeliveryVendor: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Delivery Vendor...", req, res);
    const vendorId = req.body.vendor_id;
    const branchId = req.body.branch_id;
    // const filters = new ShopUpdateFilters(req.body);
    var sqlQuery = "UPDATE delivery_shops SET status = 0 WHERE vendor_id = ? AND branch_id = ?";
    var queryData = [vendorId, branchId];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Delivery Vendor But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM delivery_shops WHERE vendor_id = ? AND branch_id = ?";
            queryData = [vendorId, branchId];
            const vendor: dbModel.DeliveryShops[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Delivery Vendor...", req, res);
            res.json(PublicInfo.infoUpdated({ vendor: new deliveryShops(vendor[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Delivery Vendor...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}