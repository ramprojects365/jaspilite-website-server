import { RequestHandler } from "express-serve-static-core";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { ShopItemSummary } from "../../../../../model/shopitems/shopItemSummary";
import { ShopItemUpdateFilters } from "../../../../../model/shopitems/shopItemFilters";
import { CustomRquestHandler } from "../../../../../model/express";

export const ApiUpdateShopItems: CustomRquestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Shop Items...", req, res);
    // console.log("Body..." + JSON.stringify(req.body));
    // console.log("Product List Length - " + req.body.length);
    const items = req.body;
    const shop_id = req.user.shop_id;
    // const branch_id = req.query.branch_id;
    if (items.length == 0 || items.length == undefined) {
        return next(ApiError.errNoItemsFound({ "details": "No items found" }));
    } else if (items.length > 50) {
        return next(ApiError.errItemsCountExceededLimit({ "details": "Items count more than 50" }));
    }
    /*if (shop_id != req.user.shop_id) {
        return next(ApiError.errUnauthorizedError({ "details": "User unauthorized to perform this action." }));
    }*/
    if (req.user.user_type != 'api') {
        return next(ApiError.errUnauthorizedError({ "details": "User unauthorized to perform this action." }));
    }
    console.log(shop_id);
    // console.log(branch_id);
    console.log(req.user);
    var sqlQuery = "";
    if (shop_id != undefined) {
        for (var i = 0; i < items.length; i++) {
            // Update products based on shop
            // Check if all required fields are there
            const requiredFields = ["ean", "price", "instock"];
            const givenFields = Object.getOwnPropertyNames(items[i]);
            if (!requiredFields.every(field => givenFields.includes(field))) {
                return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
            }
            // Check if instock is a 1 or 0
            if (items[i].instock != 0 && items[i].instock != 1) {
                return next(ApiError.errItemsCountExceededLimit({ "details": "Stock must be 0 or 1 - incorrect instock parameter" }));
            }
            if(req.query.branch_id == undefined){
                sqlQuery += "UPDATE shop_items as si INNER JOIN products as p ON p.product_id = si.product_id INNER JOIN branches as b ON b.branch_id = si.branch_id INNER JOIN shops as s ON s.shop_id = b.shop_id SET si.item_price = " + items[i].price + ", si.availability = " + items[i].instock + " WHERE p.sku = '" + items[i].ean + "' AND s.shop_id = " + shop_id + ";";
            }else{
                sqlQuery += "UPDATE shop_items as si INNER JOIN products as p ON p.product_id = si.product_id INNER JOIN branches as b ON b.branch_id = si.branch_id INNER JOIN shops as s ON s.shop_id = b.shop_id SET si.item_price = " + items[i].price + ", si.availability = " + items[i].instock + " WHERE p.sku = '" + items[i].ean + "' AND s.shop_id = " + shop_id + " AND b.branch_id = " + req.query.branch_id + ";";
            }
        }
    }
    /*else if (branch_id != undefined) {
        // Update products based on branch
        // sqlQuery += "UPDATE shop_items as si INNER JOIN products as p ON p.product_id = si.product_id SET si.item_price = " + items[i].price + " WHERE p.sku = " + items[i].ean + " AND si.branch_id = " + branch_id + ";";
        return next(ApiError.errMissingBody({ "details": "Required Fields are : shop_id" }));
    }*/
    else {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : shop_id for user" }));
    }

    try {
        let countSuccess: number = 0;
        let countFailure: number = 0;
        const rows = await executeQuery(sqlQuery);
        for (var j = 0; j < rows.length; j++) {
            // console.log(rows[j]);
            // (rows[j].affectedRows > 0 ? items[j].status = "Success" : items[j].status = "Failed");
            if (rows[j].affectedRows > 0) {
                countSuccess++;
                items[j].status = "Success"
            } else {
                countFailure++;
                items[j].status = "Failed"
            }
        }
        responseLogger.print("Completed Update Shop Items...", req, res);
        res.json(PublicInfo.infoUpdated({ countSuccess: countSuccess, countFailure: countFailure, result: items }));

    } catch (error) {
        responseLogger.print("Error Update Shop Items...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}