import { RequestHandler } from "express";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { deliveryShops } from "../../../../../model/deliveryshops/deliveryShops";

export const apiAddDeliveryVendor: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Add Delivery Vendor to Shop...", req, res);
    const requiredFields = ["vendor_id", "branch_id"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newDevliveryShop: dbModel.DeliveryShops = {
        delivery_shop_id: 0,
        vendor_id: req.body.vendor_id || 0,
        branch_id: req.body.branch_id || 0
    };
    var sqlQuery = "INSERT INTO delivery_shops (vendor_id, branch_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = 1;";
    var queryData = [newDevliveryShop.vendor_id, newDevliveryShop.branch_id];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        newDevliveryShop.delivery_shop_id = rows.insertId;
        responseLogger.print("Completed Add Delivery Vendor to Shop...", req, res);
        res.json(PublicInfo.infoCreated({ shop: new deliveryShops(newDevliveryShop) }));
    } catch (error) {
        responseLogger.print("Error Add Delivery Vendor to Shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}