import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { apiAdminRefreshToken } from "./apiAdminRefreshToken";


export let tokenRefreshRouter = Router();

tokenRefreshRouter.route("/admin")
    .post(jsonParser, apiAdminRefreshToken);