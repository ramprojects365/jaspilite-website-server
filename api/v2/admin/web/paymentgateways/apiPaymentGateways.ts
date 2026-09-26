import { Router } from "express";
import { apiGetPaymentGatewaysList } from "./apiGetPaymentGatewaysList";
import { apiAddPaymentGateway } from "./apiAddPaymentGateway";
import { jsonParser } from "../../../general/bodyParser";
import { apiDisablePaymentGateway } from "./apiDisablePaymentGateway";
import { apiGetPaymentGatewayListForBranch } from "./apiGetPaymentGatewayListForBranch";

export let shopsPaymentGatewayRouter = Router();

shopsPaymentGatewayRouter.route("/")
    .post(jsonParser, apiAddPaymentGateway);

shopsPaymentGatewayRouter.route("/disable")
    .post(jsonParser, apiDisablePaymentGateway);

shopsPaymentGatewayRouter.route("/list")
    .get(apiGetPaymentGatewaysList);

shopsPaymentGatewayRouter.route("/:branch_id")
    .get(apiGetPaymentGatewayListForBranch);