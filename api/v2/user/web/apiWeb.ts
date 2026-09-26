import { Router } from "express";
import { jsonParser } from "../../general/bodyParser";
import { apiContactUs } from "./contactus/contactUs";


export let userWebRouter = Router();

// userWebRouter.use("/contactus", apiContactUs);
userWebRouter.route("/:sales_id")
    .post(jsonParser, apiContactUs)