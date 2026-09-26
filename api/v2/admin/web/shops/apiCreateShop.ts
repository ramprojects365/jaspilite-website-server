import { RequestHandler } from "express";

import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { responseLogger } from "../../../general/responseLogs";
import { ShopSummary } from "../../../../../model/shop/shopSummary";
import * as dbModel from "../../../../../db/model_created";

export const apiCreateShop: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Create Shop...", req, res);
    const requiredFields = ["user_id", "shop_name"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newShop: dbModel.shops = {
        shop_id: 0,
        user_id: req.body.user_id || 0,
        shop_name: req.body.shop_name || "",
        shop_addr: req.body.shop_addr || ""
    };
    var sqlQuery = "INSERT INTO shops (user_id, shop_name, shop_addr) VALUES (?, ?, ?)";
    var queryData = [newShop.user_id, newShop.shop_name, newShop.shop_addr];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        newShop.shop_id = rows.insertId;
        responseLogger.print("Completed Create Shop...", req, res);
        res.json(PublicInfo.infoCreated({ shop: new ShopSummary(newShop) }));
    } catch (error) {
        responseLogger.print("Error Create Shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}