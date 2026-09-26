import { RequestHandler } from "express";
const moment = require('moment');
import uuid from "uuid/v4";

import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { responseLogger } from "../../../general/responseLogs";
import { PromotionSummary } from "../../../../../model/promotions/promotionSummary";

export const ApiAddPromotion: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Add Promotions...", req, res);
    const requiredFields = ["branch_id", "picture", "title", "description", "start_date", "end_date", "discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newPromotion: dbModel.Promotions = {
        promo_id: 0,
        branch_id: req.body.branch_id || "",
        picture: req.body.picture || "",
        title: req.body.title || "",
        description: req.body.description || "",
        start_date: moment(req.body.start_date, 'YYYY-MM-DD').unix() || "",
        end_date: moment(req.body.end_date, 'YYYY-MM-DD').unix() || "",
        discount: req.body.discount || 0,
        created_date: moment(req.body.created_date, 'YYYY-MM-DD').unix() || "",
        status: 1
    };
    let promoId = uuid().toString();
    let sqlQuery = "INSERT INTO  promotions (promo_id, branch_id, picture, title, description, start_date, end_date, all_discount_percentage, all_discount_amount, created_date, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    let queryData = [promoId, newPromotion.branch_id, newPromotion.picture, newPromotion.title, newPromotion.description, newPromotion.start_date, newPromotion.end_date, newPromotion.discount, 0, newPromotion.created_date, newPromotion.status];
    const rows = await executeQuery(sqlQuery, queryData);
    newPromotion.promo_id = rows.insertId;
    responseLogger.print("Completed Add Promotions...", req, res);
    res.json(PublicInfo.infoCreated({ saleItem: new PromotionSummary(newPromotion) }));
}
/*
export const ApiAddPromotion: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Add Promotions...", req, res);
    const requiredFields = ["branch_id", "picture", "title", "description", "start_date", "end_date", "discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newPromotion: dbModel.Promotions = {
        promo_id: 0,
        branch_id: req.body.branch_id || "",
        picture: req.body.picture || "",
        title: req.body.title || "",
        description: req.body.description || "",
        start_date: moment(req.body.start_date, 'YYYY-MM-DD').unix() || "",
        end_date: moment(req.body.end_date, 'YYYY-MM-DD').unix() || "",
        discount: req.body.discount || 0,
        created_date: moment(req.body.created_date, 'YYYY-MM-DD').unix() || "",
        status: 1,
        products: req.body.products || [],
    };
    var sqlQuery = '';
    var queryData = [];
    // sqlQuery = 'SELECT * FROM promotions WHERE branch_id = ? AND (start_date >= ? OR end_date <= ?)';
    sqlQuery = 'SELECT * FROM promotions WHERE branch_id = ? AND (? BETWEEN start_date AND end_date OR ? BETWEEN start_date AND end_date) AND status = 1';
    queryData = [newPromotion.branch_id, newPromotion.start_date, newPromotion.end_date];
    try {
        const existingPromo = await executeQuery(sqlQuery, queryData);
        if (existingPromo.length > 0) {
            return next(ApiError.promoExists({ "details": "timings " + newPromotion.start_date + " - " + newPromotion.end_date }));
        }
        let promoId = uuid().toString();
        if (newPromotion.discount != 0) {
            sqlQuery = "INSERT INTO  promotions (promo_id, branch_id, picture, title, description, start_date, end_date, all_discount_percentage, all_discount_amount, created_date, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            queryData = [promoId, newPromotion.branch_id, newPromotion.picture, newPromotion.title, newPromotion.description, newPromotion.start_date, newPromotion.end_date, newPromotion.discount, 0, newPromotion.created_date, newPromotion.status];
            const rows = await executeQuery(sqlQuery, queryData);
            newPromotion.promo_id = rows.insertId;
            responseLogger.print("Completed Add Promotions...", req, res);
            res.json(PublicInfo.infoCreated({ saleItem: new PromotionSummary(newPromotion) }));
        }else{
            let sqlQuery = "";
            var queryData = [];
            sqlQuery = "INSERT INTO  promotions (promo_id, branch_id, picture, title, description, start_date, end_date, all_discount_percentage, all_discount_amount, created_date, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";
            queryData = [promoId, newPromotion.branch_id, newPromotion.picture, newPromotion.title, newPromotion.description, newPromotion.start_date, newPromotion.end_date, newPromotion.discount, 0, newPromotion.created_date, newPromotion.status];
            for (var i = 0; i < newPromotion.products.length; i++) {
                let promoItemsId = uuid().toString();
                sqlQuery += "INSERT INTO promotion_items (promo_items_id, promo_id, shop_items_id, discount_percentage) VALUES ('" + promoItemsId + "', '" + promoId + "', '" + newPromotion.products[i].id + "', " + newPromotion.products[i].percentage +  "); ";
            }
            console.log("==============Query===============");
            console.log(sqlQuery);
            console.log("=============================");
            const rows = await executeQuery(sqlQuery, queryData);
            newPromotion.promo_id = rows.insertId;
            responseLogger.print("Completed Add Promotions...", req, res);
            res.json(PublicInfo.infoCreated({ saleItem: new PromotionSummary(newPromotion) }));
        }
    } catch (error) {
        responseLogger.print("Error Add Promotions...", req, res);
        console.log("--------------------------");
        console.log(error);
        console.log("--------------------------");
        return next(ApiError.errInDatabase(error));
    }
}

*/