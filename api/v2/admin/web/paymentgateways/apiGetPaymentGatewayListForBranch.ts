import { RequestHandler } from "express-serve-static-core";
import { executeQuery } from "../../../../../db/db";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { paymentGatewaysOfBranch } from "../../../../../model/paymentGatewaysList/paymentGatewaysListSummary";

export const apiGetPaymentGatewayListForBranch: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Payment Gateway List for shop...", req, res);
    const branchId = req.params.branch_id;
    var sqlQuery = 'SELECT * FROM payment_gateways AS pg LEFT JOIN payment_gateway_vs_branches AS pgv ON pg.payment_gateway_id = pgv.payment_gateway_id WHERE branch_id = ?;';
    var queryData = [branchId];
    try {
        const services: dbModel.PaymentGatewayOfBranch[] = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Get Payment Gateway List for shop...", req, res);
        res.json(PublicInfo.infoSendData({ paymentgateways: services.map((item: dbModel.PaymentGatewayOfBranch) => new paymentGatewaysOfBranch(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Payment Gateway List for shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}