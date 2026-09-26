import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiGetCategories } from "./apiGetCategories";
import { ApiCreateCategory } from "./apiCreateCategory";
import { ApiDeleteCategory } from "./apiDeleteCategory";
import { ApiUpdateCategory } from "./apiUpdateCategory";

export let categoriesRouter = Router();

categoriesRouter.route("/")
    .get(ApiGetCategories)
    .post(jsonParser, ApiCreateCategory);

categoriesRouter.route("/:category_id")
    .delete(ApiDeleteCategory)
    .patch(jsonParser, ApiUpdateCategory);