import { RequestHandler } from "express";
import uuid from "uuid/v4";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { ShopItemSummary } from "../../../../../model/shopitems/shopItemSummary";

export const ApiCreateShopItem: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Create ShopItem...", req, res);
    console.log(req.body);
    const requiredFields = ["branch_ids", "product_id", "item_price", "item_discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        responseLogger.print("Missing Required Fields..." + requiredFields, req, res);
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newShopItem: dbModel.shopItems = {
        item_id: '',
        branch_ids: req.body.branch_ids || [],
        product_id: req.body.product_id || "",
        item_price: req.body.item_price || "",
        item_discount: req.body.item_discount || 0,
        remarks: req.body.remarks || "",
        item_qr_code: req.body.item_qr_code || "",
        articleNumber: req.body.articleNumber || "",
        item_quantity: req.body.item_quantity || 0,
        max_items_per_order: req.body.max_quantity || 0,
        availability: req.body.availability || 1,
        hidden: req.body.histor || 0,
    };
    var sqlQuery = "";
    var queryData = [];
    for (var i = 0; i < newShopItem.branch_ids.length; i++) {
        sqlQuery += "INSERT INTO shop_items(item_id, branch_id, product_id, item_price, item_discount, remarks, articleNumber, item_quantity, max_items_per_order, availability) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        queryData.push(uuid(), newShopItem.branch_ids[i], newShopItem.product_id
            , newShopItem.item_price, newShopItem.item_discount, newShopItem.remarks, newShopItem.articleNumber
            , newShopItem.item_quantity, newShopItem.max_items_per_order, newShopItem.availability);
    }
    // var sqlQuery = "INSERT INTO shop_items(item_id, branch_id, product_id, item_price, item_discount, item_qr_code, articleNumber, item_quantity, availability) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
    // queryData = [newShopItem.item_id, newShopItem.branch_ids, newShopItem.product_id
    //     , newShopItem.item_price, newShopItem.item_discount, newShopItem.item_qr_code, newShopItem.articleNumber
    //     , newShopItem.item_quantity, newShopItem.availability];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Create ShopItem...", req, res);
        res.json(PublicInfo.infoCreated({ category: new ShopItemSummary(newShopItem) }));
    } catch (error) {
        responseLogger.print("Error Create ShopItem..." + error, req, res);
        if (error.toString().indexOf('Duplicate') !== -1) {
            return next(ApiError.errInDatabaseDuplicate(error));
        } else {
            return next(ApiError.errInDatabase(error));
        }
    }
}