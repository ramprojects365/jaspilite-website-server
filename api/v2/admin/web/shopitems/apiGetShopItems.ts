import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { ShopItemGetFilters } from "../../../../../model/shopitems/shopItemFilters";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { fileMapper } from "../../../general/static";
import { ShopItemSummary } from "../../../../../model/shopitems/shopItemSummary";

export const ApiGetShopItems: RequestHandler = async (req, res, next) =>{
    responseLogger.print("Calling Get Shop Items...", req, res);
    const requiredFields = ["branch_id"];
    const givenFields = Object.getOwnPropertyNames(req.query);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const filters = new ShopItemGetFilters(req.query);
    var sqlQuery = 'SELECT si.item_id, si.branch_id, p.category_id, c.category_name, si.product_id, si.max_items_per_order, p.name, si.item_price, p.image, p.description, p.company, si.item_discount, si.remarks, p.sku AS item_qr_code, si.articleNumber, si.item_quantity, si.availability, si.hidden FROM shop_items as si INNER JOIN products as p ON si.product_id = p.product_id INNER JOIN product_category as c ON p.category_id = c.category_id WHERE ' + filters.getCondition();
    try {
        const products: dbModel.product[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Shop Items...", req, res);
        // To change image to full image path
        products.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'product_images').toString());
        res.json(PublicInfo.infoSendData({ products: products.map((item: dbModel.product) => new ShopItemSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Shop Items...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}