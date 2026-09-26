import { Router } from "express";

import { adminWebRouter } from "./web/apiWeb";
import { reportsRouter } from "./reports/reports";
import { externalRouter } from "./externalapis/apiExternal";

export let adminRouter = Router();

adminRouter.use("/web", adminWebRouter);
adminRouter.use("/reports", reportsRouter);
adminRouter.use("/external", externalRouter);
