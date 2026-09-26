import { RequestHandler } from "express";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { deliveryVendorsListSummary } from "../../../../../model/deliveryVendorsList/deliveryVendorsListSummary";
import { deliveryvendorsListFilters } from "../../../../../model/deliveryVendorsList/deliveryVendorsListFilters";

export const apiGetDeliveryVendorsList: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Delivery Vendor List...", req, res);
    const filters = new deliveryvendorsListFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT * FROM delivery_vendors WHERE ' + filters.getCondition() + ';';
    try {
        const services: dbModel.deliveryVendorsList[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Delivery Vendor List...", req, res);
        res.json(PublicInfo.infoSendData({ vendors: services.map((item: dbModel.deliveryVendorsList) => new deliveryVendorsListSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Delivery Vendor List...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}