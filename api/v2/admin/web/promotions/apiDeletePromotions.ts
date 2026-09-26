import { RequestHandler } from "express-serve-static-core";
import { executeQuery } from "../../../../../db/db";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const apiDeletePromotions: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Promotions...", req, res);
    const promoId = req.params.promo_id;
    var sqlQuery = "UPDATE promotions SET status = 2 WHERE promo_id = ?";
    var queryData = [promoId];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Promotions But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Promotions...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: promoId }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Promotions...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}