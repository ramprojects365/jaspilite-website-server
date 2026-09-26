import { RequestHandler } from "express-serve-static-core";
import { executeQuery } from "../../../../../db/db";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { paymentGatewayBranches } from "../../../../../model/paymentGatewayBranches/paymentGatewayBranches";

export const apiDisablePaymentGateway: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Update Payment Gateway...", req, res);
    const PaymentGatewayId = req.body.payment_gateway_id;
    const branchId = req.body.branch_id;
    var sqlQuery = "UPDATE payment_gateway_vs_branches SET status = 0 WHERE payment_gateway_id = ? AND branch_id = ?";
    var queryData = [PaymentGatewayId, branchId];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogger.print("Completed Update Payment Gateway But no row updated...", req, res);
            res.json(PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        } else {
            sqlQuery = "SELECT * FROM payment_gateway_vs_branches WHERE payment_gateway_id = ? AND branch_id = ?";
            queryData = [PaymentGatewayId, branchId];
            const paymentgateway: dbModel.PaymentGatewayBranch[] = await executeQuery(sqlQuery, queryData);
            responseLogger.print("Completed Update Payment Gateway...", req, res);
            res.json(PublicInfo.infoUpdated({ paymentgateways: new paymentGatewayBranches(paymentgateway[0]) }));
        }
    } catch (error) {
        responseLogger.print("Error Update Payment Gateway...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}