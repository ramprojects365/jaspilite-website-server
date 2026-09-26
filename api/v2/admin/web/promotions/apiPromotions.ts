import { Router } from "express";
import { jsonParser } from "../../../general/bodyParser";
import { ApiAddProdToPromotion } from "./apiAddProdToPromotion";
import { ApiAddPromotion } from "./apiAddPromotion";
import { ApiDeletePromotionItem } from "./apiDeletePromotionItem";
import { apiDeletePromotions } from "./apiDeletePromotions";
import { ApiGetPromotionItems } from "./apiGetPromotionItems";
import { ApiGetPromotions } from "./apiGetPromotions";
import { apiUpdatePromotions } from "./apiUpdatePromotions";

export let prototionsRouter = Router();

prototionsRouter.route("/")
    .get(ApiGetPromotions)
    .post(jsonParser, ApiAddPromotion);

prototionsRouter.route("/:promo_id")
    .delete(apiDeletePromotions)
    .patch(jsonParser, apiUpdatePromotions);

prototionsRouter.route("/item")
    .get(ApiGetPromotionItems);

prototionsRouter.route("/item/:promo_id")
    .post(jsonParser, ApiAddProdToPromotion);

prototionsRouter.route("/item/remove/:item_id")
    .delete(ApiDeletePromotionItem);