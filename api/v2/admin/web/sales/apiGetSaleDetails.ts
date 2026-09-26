import { RequestHandler } from "express";

import { executeQuery } from "../../../../../db/db";
import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { SaleDetailsFilters } from "../../../../../model/sales/salesFilter";
import { SaleDetails } from "../../../../../model/sales/saleDetails";
import { fileMapper } from "../../../general/static";

export const ApiGetSaleDetails: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Sales Details...", req, res);
    const filters = new SaleDetailsFilters(req.params);
    var sqlQuery = 'SELECT d.sales_details_id, d.product_id, d.quantity, d.item_price, d.discount, p.name, p.sku AS item_qr_code, si.articleNumber, p.image FROM sales_details as d INNER JOIN products as p ON d.product_id = p.product_id INNER JOIN shop_items as si ON d.item_id = si.item_id WHERE ' + filters.getCondition();
    try {
        const saledetails: dbModel.product[] = await executeQuery(sqlQuery);
        // To change image to full image path
        saledetails.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'product_images').toString());
        responseLogger.print("Completed Get Sales Details...", req, res);
        res.json(PublicInfo.infoSendData({ saledetails: saledetails.map((item: dbModel.product) => new SaleDetails(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Sales Details...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}