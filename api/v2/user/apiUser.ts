import { Router } from "express";

import { userMobileRouter } from "./mobile/apiMobile";
import { userWebRouter } from "./web/apiWeb";

export let userRouter = Router();

userRouter.use("/mobile", userMobileRouter);
userRouter.use("/web", userWebRouter);