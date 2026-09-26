import { RequestHandler } from "express";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { ShopsAndBranches } from "../../../../../model/shopsandbranches/shopsAndBranches";
import { fileMapper } from "../../../general/static";

export const apiGetShopsAndBranches: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Shops and Branches...", req, res);
    // const filters = new deliveryvendorsListFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT s.shop_id, b.branch_id, s.shop_name, b.branch_name, b.image, b.currency, b.isPosEnabled, b.active FROM shops AS s INNER JOIN branches AS b WHERE s.shop_id = b.shop_id;';
    try {
        const services: dbModel.ShopAndBranches[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Shops and Branches...", req, res);
        // To change image to full image path
        services.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(PublicInfo.infoSendData({ shops: services.map((item: dbModel.ShopAndBranches) => new ShopsAndBranches(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Shops and Branches...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}