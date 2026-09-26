import { Router } from "express";
import { apiGetShopsAndBranches } from "./apiGetShopsAndBranches";


export let shopsAndBranchesRouter = Router();

shopsAndBranchesRouter.route("/")
    .get(apiGetShopsAndBranches);
