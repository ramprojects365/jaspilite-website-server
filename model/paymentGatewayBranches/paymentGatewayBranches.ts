import * as dbModel from "../../db/model_created";

export class paymentGatewayBranches {
    payment_gateway_branchid: number;
    payment_gateway_id: number;
    branch_id: number;
    constructor(data: dbModel.PaymentGatewayBranch) {
        this.payment_gateway_branchid = data.payment_gateway_branchid;
        this.payment_gateway_id = data.payment_gateway_id;
        this.branch_id = data.branch_id;
    };
}