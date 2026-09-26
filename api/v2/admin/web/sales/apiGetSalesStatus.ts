import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import * as moment from 'moment';
import { SaleStatus } from "../../../../../model/sales/saleStatus";

export const ApiGetSalesStatus: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Sales Status...", req, res);
    // const filters = new SalesGetFilters(req.query);
    const salesId = req.params.sales_id;
    // console.log(moment.isDate(req.query.from));
    // console.log(moment(req.body.from).format('DD/MM/YYYY').toString())
    var sqlQuery = 'SELECT * FROM sales_status  WHERE sales_id = ? ORDER BY date desc';
    var queryData = [salesId];
    try {
        const status: dbModel.product[] = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Get Sales Status...", req, res);
        res.json(PublicInfo.infoSendData({ status: status.map((item: dbModel.product) => new SaleStatus(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Sales Status...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}