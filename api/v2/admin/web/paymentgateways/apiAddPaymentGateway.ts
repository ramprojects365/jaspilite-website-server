import { RequestHandler } from "express";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { paymentGatewayBranches } from "../../../../../model/paymentGatewayBranches/paymentGatewayBranches";

export const apiAddPaymentGateway: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Add Payment Gateway to Shop Branch...", req, res);
    const requiredFields = ["payment_gateway_id", "branch_id"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newPaymentGatewayBranch: dbModel.PaymentGatewayBranch = {
        payment_gateway_branchid: 0,
        payment_gateway_id: req.body.payment_gateway_id || 0,
        branch_id: req.body.branch_id || 0
    };
    var sqlQuery = "INSERT INTO payment_gateway_vs_branches (payment_gateway_id, branch_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = 1;";
    var queryData = [newPaymentGatewayBranch.payment_gateway_id, newPaymentGatewayBranch.branch_id];
    try {
        const rows = await executeQuery(sqlQuery, queryData);
        newPaymentGatewayBranch.payment_gateway_branchid = rows.insertId;
        responseLogger.print("Completed Add Payment Gateway to Shop Branch...", req, res);
        res.json(PublicInfo.infoCreated({ shop: new paymentGatewayBranches(newPaymentGatewayBranch) }));
    } catch (error) {
        responseLogger.print("Error Add Payment Gateway to Shop Branch...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}