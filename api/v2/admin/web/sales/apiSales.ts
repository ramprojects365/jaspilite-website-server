import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiGetSales } from "./apiGetSales";
import { ApiGetSaleDetails } from "./apiGetSaleDetails";
import { ApiAddSaleItem } from "./apiAddSaleItem";
import { ApiGetSalesCount } from "./apiGetSalesCount";
import { ApiGetSalesTotal } from "./apiGetSalesTotal";
import { ApiDeleteSale } from "./apiDeleteSale";
import { ApiDeleteSalesItem } from "./apiDeleteSalesItem";
import { ApiUpdateSaleItem } from "./apiUpdateSaleItem";
import { ApiGetSalesStatus } from "./apiGetSalesStatus";
import { ApiDeleteSalesStatus } from "./apiDeleteSalesStatus";
import { ApiUpdateSalesStatus } from "./apiUpdateSalesStatus";

export let salesRouter = Router();

salesRouter.route("/count")
    .get(ApiGetSalesCount);

salesRouter.route("/total")
    .get(ApiGetSalesTotal);

salesRouter.route("/")
    .get(ApiGetSales);
// .post(jsonParser, ApiCreateProduct);

salesRouter.route("/:sales_id")
    .get(ApiGetSaleDetails)
    .post(jsonParser, ApiAddSaleItem)
    .delete(ApiDeleteSale);
// .patch(jsonParser, ApiUpdateSaleItem);

salesRouter.route("/item/:sales_details_id")
    // .get(ApiGetSaleDetails)
    // .post(jsonParser, ApiAddSaleItem)
    // .delete(ApiDeleteSalesItem)
    .patch(jsonParser, ApiUpdateSaleItem);

salesRouter.route("/item/:sales_details_id/:total/:sales_id")
    // .get(ApiGetSaleDetails)
    // .post(jsonParser, ApiAddSaleItem)
    .delete(ApiDeleteSalesItem);
// .patch(jsonParser, ApiUpdateSaleItem);

salesRouter.route("/status/:sales_id")
    .get(ApiGetSalesStatus)
    // .post(jsonParser, ApiAddSaleItem)
    // .delete(ApiDeleteSale);
    .patch(jsonParser, ApiUpdateSalesStatus);

salesRouter.route("/status/:sales_id/:status_id/:status")
    // .get(ApiGetSalesStatus)
    // .post(jsonParser, ApiAddSaleItem)
    .delete(ApiDeleteSalesStatus);
    // .patch(jsonParser, ApiUpdateSaleItem)
