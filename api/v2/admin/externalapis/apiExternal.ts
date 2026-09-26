import { Router } from "express";

import { shopItemsRouter } from "./shopitems/apiShopItems";
import { apiSessionVerify } from "../web/login/apiSessionVerify";
import { CustomRquestHandler } from "../../../../model/express";
import { ApiError } from "../../../../model/shared/messages";
// import { reportsRouter } from "./reports/reports";

export let externalRouter = Router();

externalRouter.use(apiSessionVerify);

const checkSession: CustomRquestHandler = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        next(ApiError.errUnauthorizedError());
    }
}

externalRouter.use("/items", checkSession, shopItemsRouter);
// adminRouter.use("/reports", reportsRouter);