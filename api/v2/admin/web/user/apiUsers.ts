import { Router } from "express";
import { jsonParser } from "../../../general/bodyParser";

import { apiCreateUser } from "./apiCreateUser";
import { apiGetUsers } from './apiGetUsers'
import { apiDeleteUser } from "./apiDeleteUser";
import { apiUpdateUser } from "./apiUpdateUser";

export let usersRouter = Router();

usersRouter.route("/")
    .get(apiGetUsers)
    .post(jsonParser, apiCreateUser);

    usersRouter.route("/:id")
    .delete(apiDeleteUser)
    .patch(jsonParser, apiUpdateUser);