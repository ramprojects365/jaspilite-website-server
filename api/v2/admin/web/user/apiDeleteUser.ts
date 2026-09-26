import { RequestHandler } from "express-serve-static-core";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const apiDeleteUser: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete User...", req, res);
    const userID = req.params.id;
    var sqlQuery = "DELETE FROM adminusers WHERE id = ?";
    var queryData = [userID];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogger.print("Completed Delete User But no row updated...", req, res);
            res.json(PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        } else {
            responseLogger.print("Completed Delete User...", req, res);
            res.json(PublicInfo.infoDeleted({ deleted_id: userID }));
        }
    } catch (error) {
        responseLogger.print("Error Delete Shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}