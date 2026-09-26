import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiGetShopItems } from "./apiGetShopItems";
import { ApiUpdateShopItem } from "./apiUpdateShopItem";
import { ApiCreateShopItem } from "./apiCreateShopItem";


export let shopItemsRouter = Router();

shopItemsRouter.route("/count")
// .get(ApiGetProductsCount);

shopItemsRouter.route("/")
    .get(ApiGetShopItems)
    .post(jsonParser, ApiCreateShopItem);

shopItemsRouter.route("/:item_id")
    // .delete(ApiDeleteProducts)
    .patch(jsonParser, ApiUpdateShopItem);