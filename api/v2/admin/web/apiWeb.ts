import { Router } from "express";

import { shopsRouter } from "./shops/apiShops";
import { usersRouter } from "./user/apiUsers";
import { loginRouter } from "./login/apiLogin";
import { apiSessionVerify } from "./login/apiSessionVerify";
import { CustomRquestHandler } from "../../../../model/express";
import { ApiError } from "../../../../model/shared/messages";
import { tokenRefreshRouter } from "./refreshtokens/apiRefreshToken";
import { categoriesRouter } from "./categories/apiCategories";
import { productsRouter } from "./products/apiProducts";
import { uploadRouter } from "./uploads/apiUploads";
import { branchesRouter } from "./branches/apiBranches";
import { shopItemsRouter } from "./shopitems/apiShopItems";
import { salesRouter } from "./sales/apiSales";
import { addressRouter } from "./address/apiAddress";
import { shopsDeliveryRouter } from "./deliveryvendors/apiDeliveryVendors";
import { shopsAndBranchesRouter } from "./shopsandbranches/apiShopsandbranches";
import { prototionsRouter } from "./promotions/apiPromotions";
import { accountDeleteRouter } from "./accountdelete/apiDeleteaccount";
import { shopsPaymentGatewayRouter } from "./paymentgateways/apiPaymentGateways";

export let adminWebRouter = Router();

adminWebRouter.use(apiSessionVerify);

const checkSession: CustomRquestHandler = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        next(ApiError.errUnauthorizedError());
    }
}

adminWebRouter.use("/login", loginRouter);
adminWebRouter.use("/acountdelete", accountDeleteRouter);
adminWebRouter.use("/refreshtoken", tokenRefreshRouter);
adminWebRouter.use("/upload", checkSession, uploadRouter);
adminWebRouter.use("/user", checkSession, usersRouter);
adminWebRouter.use("/shops", checkSession, shopsRouter);
adminWebRouter.use("/branches", checkSession, branchesRouter);
adminWebRouter.use("/categories", checkSession, categoriesRouter);
adminWebRouter.use("/products", checkSession, productsRouter);
adminWebRouter.use("/promotions", checkSession, prototionsRouter);
adminWebRouter.use("/shopitems", checkSession, shopItemsRouter);
adminWebRouter.use("/sales", checkSession, salesRouter);
adminWebRouter.use("/address", checkSession, addressRouter);
adminWebRouter.use("/shop/deliveryvendors", checkSession, shopsDeliveryRouter);
adminWebRouter.use("/shopsandbranches", checkSession, shopsAndBranchesRouter);
adminWebRouter.use("/shop/paymentgateways", checkSession, shopsPaymentGatewayRouter);