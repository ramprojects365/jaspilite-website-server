import { Router } from "express";
import { apiGetBranches } from "./apiGetBranches";
import { apiGetBranchDetails } from "./apiGetBranchDetails";

export let branchRouter = Router();

branchRouter.route("/")
    .get(apiGetBranches);

branchRouter.route("/:branch_id")
    .get(apiGetBranchDetails);