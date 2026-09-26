import { RequestHandler } from "express-serve-static-core";
import * as fs from "fs";

import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import * as dbModel from "../../../../../db/model_created";
import { BranchSummary } from "../../../../../model/branch/branchSummary";
import bodyParser = require("body-parser");

export const ApiCreateBranch: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Create Branch...", req, res);
    // 21 items required
    const requiredFields = ["shop_id", "branch_name", "phone_no", "branch_addr", "landmark", "image", "currency", "maximum_distance", "minimum_sale", "open_time", "close_time",
        "isAdminDelivery", "isPosEnabled", "track_stock", "latitude", "longitude", "home_screen_theme", "rad_three_rate", "rad_five_rate", "rad_ten_rate", "rad_twenty_rate"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    const newBranch: dbModel.branches = {
        branch_id: 0,
        shop_id: req.body.shop_id || 0,
        branch_cat_id: req.body.branch_cat_id || 1,
        branch_name: req.body.branch_name || "",
        phone_no: req.body.phone_no || "",
        branch_addr: req.body.branch_addr || "",
        landmark: req.body.landmark || "",
        image: image || "",
        currency: req.body.currency || "",
        maximum_distance: req.body.maximum_distance || "",
        minimum_sale: req.body.minimum_sale || 0,
        open_time: req.body.open_time || "",
        close_time: req.body.close_time || "",
        isAdminDelivery: req.body.isAdminDelivery || 0,
        isPosEnabled: req.body.isPosEnabled || 0,
        track_stock: req.body.track_stock || 0,
        latitude: req.body.latitude || "",
        longitude: req.body.longitude || "",
        home_screen_theme: req.body.home_screen_theme || 1,
        welcomeMessage: req.body.welcomeMessage || "",
        rad_three_rate: req.body.rad_three_rate || 0,
        rad_five_rate: req.body.rad_five_rate || 0,
        rad_ten_rate: req.body.rad_ten_rate || 0,
        rad_fifteen_rate: req.body.rad_fifteen_rate || 0,
        rad_twenty_rate: req.body.rad_twenty_rate || 0,

    };
    fs.copyFile('public/cache/' + image, 'public/shop_images/' + image, async (err) => {
        if (err) {
            return next(ApiError.errCopyImageFailed({ "details": "Image copy failed" }));
        }
        fs.unlink('public/cache/' + image, (err) => {
            if (err) {
                responseLogger.print("Image Delete from cache failed...", req, res);
                return
            }
            responseLogger.print("Image Delete from cache sucess...", req, res);
        });
        responseLogger.print('Image was moved.........', req, res);
        var sqlQuery = "INSERT INTO branches(shop_id, branch_cat_id, branch_name, phone_no, branch_addr, landmark, image, currency, maximum_distance, minimum_sale, open_time, close_time, isAdminDelivery, isPosEnabled, track_stock, latitude, longitude, home_screen_theme, welcomeMessage, rad_three_rate, rad_five_rate, rad_ten_rate, rad_fifteen_rate, rad_twenty_rate, active) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);";
        var queryData = [newBranch.shop_id, newBranch.branch_cat_id, newBranch.branch_name, newBranch.phone_no, newBranch.branch_addr, newBranch.landmark, newBranch.image, newBranch.currency, newBranch.maximum_distance, newBranch.minimum_sale, newBranch.open_time, newBranch.close_time, newBranch.isAdminDelivery, newBranch.isPosEnabled, newBranch.track_stock, newBranch.latitude, newBranch.longitude, newBranch.home_screen_theme, newBranch.welcomeMessage, newBranch.rad_three_rate, newBranch.rad_five_rate, newBranch.rad_ten_rate, newBranch.rad_fifteen_rate, newBranch.rad_twenty_rate];
        try {
            const rows = await executeQuery(sqlQuery, queryData);
            newBranch.branch_id = rows.insertId;
            responseLogger.print("Completed Create Branch...", req, res);
            res.json(PublicInfo.infoCreated({ shop: new BranchSummary(newBranch) }));
        } catch (error) {
            responseLogger.print("Error Create Branch...", req, res);
            return next(ApiError.errInDatabase(error));
        }
    });
}