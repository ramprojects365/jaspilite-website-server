import { RequestHandler } from "express-serve-static-core";
import { executeQuery } from "../../../../../db/db";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const apiDeleteShop: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Shop...", req, res);
    const shopID = req.params.shop_id;
    var sqlQuery = "DELETE FROM shops WHERE shop_id = ?";
    var queryData = [shopID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete Shop But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete Shop...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: shopID }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}