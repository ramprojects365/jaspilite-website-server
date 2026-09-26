import { Router } from "express";

import { branchRouter } from "./branches/apiBranches";
import { loginRouter } from "./login/apiLogin";

export let userMobileRouter = Router();

userMobileRouter.use("/branches", branchRouter);
userMobileRouter.use("/login", loginRouter);