import { Router } from "express";

export let uploadRouter = Router();
import { jsonParser } from "../../../general/bodyParser";
import { ApiUploadImage } from "./apiUploadImage";

uploadRouter.route("/image")
    .post(jsonParser, ApiUploadImage);