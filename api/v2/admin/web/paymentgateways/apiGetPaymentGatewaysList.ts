import { RequestHandler } from "express";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { paymentGatewayListSummary } from "../../../../../model/paymentGatewaysList/paymentGatewaysListSummary";
export const apiGetPaymentGatewaysList: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Payment Gateway List...", req, res);
    var sqlQuery = 'SELECT * FROM payment_gateways;';
    try {
        const services: dbModel.paymentgatewayList[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Payment Gateway List...", req, res);
        res.json(PublicInfo.infoSendData({ paymentgateways: services.map((item: dbModel.paymentgatewayList) => new paymentGatewayListSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Payment Gateway List...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}