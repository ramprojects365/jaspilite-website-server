import { Router } from "express";
import { ApiGetSalesReport } from "./apiGetSalesReport";


export let salesReportRouter = Router();


salesReportRouter.route("/")
    .get(ApiGetSalesReport);
// .post(jsonParser, ApiCreateProduct);