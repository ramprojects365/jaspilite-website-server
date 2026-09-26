import { Router } from "express";

import { jsonParser } from "../../../general/bodyParser";
import { ApiGetBranches } from "./apiGetBranches";
import { ApiGetBranchesCount } from "./apiGetBranchesCount";
import { ApiCreateBranch } from "./apiCreateBranch";
import { ApiGetBranchDetails } from "./apiGetBranchDetails";
import { ApiUpdateBranch } from "./apiUpdateBranch";
import { ApiChangeBranchesStatus } from "./apiChangeBranchesStatus";
import { ApiGetMyBranchDetails } from "./apiGetMyBranchDetails";
import { ApiGetBranchesCategories } from "./apiGetBranchesCategories";


export let branchesRouter = Router();

branchesRouter.route("/count")
    .get(ApiGetBranchesCount);

branchesRouter.route("/status/:branch_id")
    .patch(jsonParser, ApiChangeBranchesStatus);

branchesRouter.route("/categories")
    .get(ApiGetBranchesCategories);

branchesRouter.route("/")
    .get(ApiGetBranches)
    .post(jsonParser, ApiCreateBranch);

branchesRouter.route("/:branch_id")
    .get(ApiGetBranchDetails)
    // .delete(apiDeleteShop)
    .patch(jsonParser, ApiUpdateBranch);

branchesRouter.route("/mybranch/:user_id")
    .get(ApiGetMyBranchDetails);



