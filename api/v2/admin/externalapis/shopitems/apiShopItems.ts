import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiUpdateShopItems } from "./apiUpdateShopItems";


export let shopItemsRouter = Router();

shopItemsRouter.route("/")
    .patch(jsonParser, ApiUpdateShopItems);