import { Router } from "express";
import { salesReportRouter } from "./sales/sales";

export let reportsRouter = Router();



reportsRouter.use("/sales", salesReportRouter);