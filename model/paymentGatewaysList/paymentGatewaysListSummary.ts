import * as dbModel from "../../db/model_created";

export class paymentGatewayListSummary {
    payment_gateway_id: number;
    payment_gateway_name: string;
    payment_currency: string;
    publish_token: string;
    secret_key: string;
    constructor(data: dbModel.paymentgatewayList) {
        this.payment_gateway_id = data.payment_gateway_id;
        this.payment_gateway_name = data.payment_gateway_name;
        this.payment_currency = data.payment_currency;
        this.publish_token = data.publish_token;
        this.secret_key = data.secret_key;
    };
}

export class paymentGatewaysOfBranch {
    payment_gateway_id: number;
    payment_gateway_name: string;
    payment_currency: string;
    publish_token: string;
    secret_key: string;
    payment_gateway_branchid: number;
    branch_id: number;
    status: number;
    constructor(data: dbModel.PaymentGatewayOfBranch) {
        this.payment_gateway_id = data.payment_gateway_id;
        this.payment_gateway_name = data.payment_gateway_name;
        this.payment_currency = data.payment_currency;
        this.publish_token = data.publish_token;
        this.secret_key = data.secret_key;
        this.payment_gateway_branchid = data.payment_gateway_branchid;
        this.branch_id = data.branch_id;
        this.status = data.status;
    };
}
