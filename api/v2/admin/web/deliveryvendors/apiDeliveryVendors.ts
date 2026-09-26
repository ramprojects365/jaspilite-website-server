import { Router } from "express";
import { apiGetDeliveryVendorsList } from "./apiGetDeliveryVendorsList";
import { apiAddDeliveryVendor } from "./apiAddDeliveryVendor";
import { jsonParser } from "../../../general/bodyParser";
import { apiDisableDeliveryVendor } from "./apiDisableDeliveryVendor";
import { apiGetDeliveryVendorListForBranch } from "./apiGetDeliveryVendorListForBranch";

export let shopsDeliveryRouter = Router();

shopsDeliveryRouter.route("/")
    .post(jsonParser, apiAddDeliveryVendor);

shopsDeliveryRouter.route("/disable")
    .post(jsonParser, apiDisableDeliveryVendor);

shopsDeliveryRouter.route("/list")
    .get(apiGetDeliveryVendorsList);

shopsDeliveryRouter.route("/:branch_id")
    .get(apiGetDeliveryVendorListForBranch);

// shopsDeliveryRouter.route("/details")
//     .get(apiGetShopServiceDetails);