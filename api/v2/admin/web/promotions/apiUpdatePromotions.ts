import { RequestHandler } from "express-serve-static-core";
const moment = require('moment');

import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { ShopSummary } from "../../../../../model/shop/shopSummary";
import { PromotionUpdateFilters } from "../../../../../model/promotions/promotionsFilter";
import { PromotionSummary } from "../../../../../model/promotions/promotionSummary";

export const apiUpdatePromotions: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Promotions...", req, res);
    const requiredFields = ["branch_id", "picture", "title", "description", "start_date", "end_date", "discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const promoId = req.params.promo_id;
    try {
        const filters = new PromotionUpdateFilters(req.body);
        var sqlQuery = '';
        var queryData = [];
        sqlQuery = "UPDATE promotions SET " + filters.getCondition() + " WHERE promo_id = ?";
        queryData = [promoId];
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Promotions But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM promotions WHERE promo_id = ?";
            queryData = [promoId];
            const promotion: dbModel.Promotions[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Promotions...", req, res);
            res.json(PublicInfo.infoUpdated({ promotion: new PromotionSummary(promotion[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Promotions...", req, res);
        return next(ApiError.errInDatabase(error));
    }

    /*
    responseLogger.print("Calling Update Promotions...", req, res);
    const requiredFields = ["branch_id", "picture", "title", "description", "start_date", "end_date", "discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const promoId = req.params.promo_id;
    
    var sqlQuery = '';
    var queryData = [];
    // sqlQuery = 'SELECT * FROM promotions WHERE branch_id = ? AND (start_date >= ? OR end_date <= ?)';
    sqlQuery = 'SELECT * FROM promotions WHERE branch_id = ? AND (? BETWEEN start_date AND end_date OR ? BETWEEN start_date AND end_date) AND status = 1';
    queryData = [req.body.branch_id, moment(req.body.start_date, 'YYYY-MM-DD').unix(), moment(req.body.end_date, 'YYYY-MM-DD').unix()];
    try {
        const existingPromo = await executeQuery(sqlQuery, queryData);
        console.log("-------------------------");
        console.log(existingPromo);
        console.log(existingPromo.length);
        console.log("-------------------------");
        if(existingPromo.length > 0){
            return next(ApiError.promoExists({ "details": "timings " + req.body.start_date + " - " + req.body.end_date}));
        }
        const filters = new PromotionUpdateFilters(req.body);
        sqlQuery = "UPDATE promotions SET " + filters.getCondition() + " WHERE promo_id = ?";
        queryData = [promoId];
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Promotions But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM promotions WHERE promo_id = ?";
            queryData = [promoId];
            const promotion: dbModel.Promotions[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Promotions...", req, res);
            res.json(PublicInfo.infoUpdated({ promotion: new PromotionSummary(promotion[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Promotions...", req, res);
        return next(ApiError.errInDatabase(error));
    }
    */
}