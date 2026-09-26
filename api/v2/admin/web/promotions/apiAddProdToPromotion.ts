import { RequestHandler } from "express";
const moment = require('moment');
import uuid from "uuid/v4";

import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { responseLogger } from "../../../general/responseLogs";
import { PromotionItemSummary } from "../../../../../model/promotions/promotionSummary";

export const ApiAddProdToPromotion: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Add Product To Promotions...", req, res);
    const requiredFields = ["product_id", "percentage"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    const promoId = req.params.promo_id;
    let promoItemsId = uuid().toString();
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    console.log(promoId);
    const newPromotionItem: dbModel.PromotionItem = {
        promo_items_id: promoItemsId,
        promo_id: promoId || 0,
        shop_items_id: req.body.product_id || "",
        percentage: req.body.percentage || "",
    };
    let sqlQuery = "INSERT INTO  promotion_items (promo_items_id, promo_id, shop_items_id, discount_percentage) VALUES(?, ?, ?, ?);";
    let queryData = [newPromotionItem.promo_items_id, newPromotionItem.promo_id, newPromotionItem.shop_items_id, newPromotionItem.percentage];
    const rows = await executeQuery(sqlQuery, queryData);
    responseLogger.print("Completed Add Product To Promotions...", req, res);
    res.json(PublicInfo.infoCreated({ promoItem: new PromotionItemSummary(newPromotionItem) }));
}