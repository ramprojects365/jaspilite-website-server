import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { CategorySummary } from "../../../../../model/categories/categorySummary";

export const ApiCreateCategory: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Create Category...", req, res);
    const requiredFields = ["category_name"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newCategory: dbModel.category = {
        category_id: 0,
        category_name: req.body.category_name || "",
        category_icon: req.body.category_icon || "FontAwsomeIcons.heart"
    };
    var sqlQuery = "INSERT INTO product_category (category_name, category_icon) VALUES (?, ?)";
    var queryData = [newCategory.category_name, newCategory.category_icon];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        newCategory.category_id = rows.insertId;
        responseLogger.print("Completed Create Category...", req, res);
        res.json(PublicInfo.infoCreated({ category: new CategorySummary(newCategory) }));
    } catch (error) {
        responseLogger.print("Error Create Category...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}