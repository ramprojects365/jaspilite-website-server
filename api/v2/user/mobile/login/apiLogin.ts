import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { apiLoginUser } from "./apiLoginUser";

export let loginRouter = Router();

loginRouter.route("/")
    .post(jsonParser, apiLoginUser);