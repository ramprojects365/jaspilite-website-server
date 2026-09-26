import { RequestHandler } from "express-serve-static-core";
import uuid from "uuid/v4";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { SaleItem } from "../../../../../model/sales/saleItem";

export const ApiAddSaleItem: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Add Sale Item...", req, res);
    const requiredFields = ["product_id", "item_id", "quantity", "item_price", "discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newSaleItem: dbModel.saleItem = {
        sales_details_id: uuid(),
        sales_id: req.params.sales_id || "",
        product_id: req.body.product_id || "",
        item_id: req.body.item_id || "",
        quantity: req.body.quantity || "",
        item_price: req.body.item_price || "",
        discount: req.body.discount || "",
    };
    var sqlQuery = "INSERT INTO sales_details (sales_details_id, sales_id, product_id, item_id, quantity, item_price, discount) VALUES (?, ?, ?, ?, ?, ?, ?); UPDATE sales SET total = total + ? WHERE sales_id = ?;";
    var queryData = [newSaleItem.sales_details_id, newSaleItem.sales_id, newSaleItem.product_id, newSaleItem.item_id, newSaleItem.quantity, newSaleItem.item_price, newSaleItem.discount, ((newSaleItem.item_price * newSaleItem.quantity) - newSaleItem.discount), newSaleItem.sales_id.toString()];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Add Sale Item...", req, res);
        res.json(PublicInfo.infoCreated({ saleItem: new SaleItem(newSaleItem) }));
    } catch (error) {
        responseLogger.print("Error Add Sale Item...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}