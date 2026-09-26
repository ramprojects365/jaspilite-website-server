import { RequestHandler } from "express-serve-static-core";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { AddressSummary } from "../../../../../model/address/addressSummary";
import { AddressGetFilters } from "../../../../../model/address/addressFilters";

export const ApiGetAddress: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Address...", req, res);
    const filters = new AddressGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM users_addresses WHERE ' + filters.getCondition();
    try {
        const address: dbModel.address[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Address...", req, res);
        res.json(PublicInfo.infoSendData({ address: address.map((item: dbModel.address) => new AddressSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Address...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}