import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiGetProducts } from "./apiGetProducts";
import { ApiCreateProduct } from "./apiCreateProduct";
import { ApiUpdateProduct } from "./apiUpdateProduct";
import { ApiDeleteProducts } from "./apiDeleteProduct";
import { ApiGetProductsCount } from "./apiGetProductsCount";


export let productsRouter = Router();

productsRouter.route("/count")
    .get(ApiGetProductsCount);

productsRouter.route("/")
    .get(ApiGetProducts)
    .post(jsonParser, ApiCreateProduct);

productsRouter.route("/:product_id")
    .delete(ApiDeleteProducts)
    .patch(jsonParser, ApiUpdateProduct);