import { Router } from "express";

import { CustomRquestHandler } from "../../model/express";
import { apiCorrs } from "./general/corrs";
import { requestLogger } from "./general/requestLogger";
import { apiValidation } from "./general/validation";
import { userRouter } from "./user/apiUser";
import { adminRouter } from "./admin/apiAdmin";
import { apiErrorHandler } from "./general/errorHandling";
import { responseLogs } from "./general/responseLogs";

export let routerV2 = Router();

// const authenticator: CustomRquestHandler = (req, res, next) => {
//     // const userName = "Sunoj Vijayan";
//     // req.user = userName;
//     next();
// }

routerV2.use(apiCorrs);
routerV2.use(responseLogs);
//routerV2.use(authenticator);
routerV2.use(requestLogger);
routerV2.use(apiValidation);

routerV2.get("/", (req, res, next) => {
    res.send("Welcome to Minimart Api Version 2.0 - " + req.app.get("env"));
});

routerV2.use("/user", userRouter);
routerV2.use("/admin", adminRouter);

routerV2.use(apiErrorHandler);
