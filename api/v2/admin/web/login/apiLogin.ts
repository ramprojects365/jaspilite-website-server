import { Router } from "express";

import { jsonParser, jsonParserUrlencoder } from "../../../general/bodyParser";
import { apiLoginUser, tokenLoginUser } from "./apiLoginUser";

export let loginRouter = Router();

loginRouter.route("/")
    .post(jsonParser, apiLoginUser);

loginRouter.route("/token")
    .post(jsonParserUrlencoder, tokenLoginUser);