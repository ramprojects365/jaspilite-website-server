import { Router } from "express";

import { apiGetShops } from "./apiGetShops";
import { jsonParser } from "../../../general/bodyParser";
import { apiCreateShop } from "./apiCreateShop";
import { apiUpdateShop } from "./apiUpdateShop";
import { apiDeleteShop } from "./apiDeleteShop";
import { ApiGetShopsCount } from "./apiGetShopsCount";

export let shopsRouter = Router();

shopsRouter.route("/count")
    .get(ApiGetShopsCount);

shopsRouter.route("/")
    .get(apiGetShops)
    .post(jsonParser, apiCreateShop);

shopsRouter.route("/:shop_id")
    .delete(apiDeleteShop)
    .patch(jsonParser, apiUpdateShop);
