import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { apiGetAccount } from "./apiGetAccount";


export let accountDeleteRouter = Router();

accountDeleteRouter.route("/user")
    .get(apiGetAccount);




