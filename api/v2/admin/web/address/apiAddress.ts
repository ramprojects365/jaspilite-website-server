import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiGetAddress } from "./apiGetAddress";

export let addressRouter = Router();

addressRouter.route("/")
    .get(ApiGetAddress);