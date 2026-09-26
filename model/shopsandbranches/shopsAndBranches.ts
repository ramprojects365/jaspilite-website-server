import * as dbModel from "../../db/model_created";

export class ShopsAndBranches{
    shop_id: number;
    branch_id: number;
    shop_name: string;
    image: string;
    branch_name: string;
    currency: string;
    isPosEnabled: number;
    active: number;
    constructor(data: dbModel.ShopAndBranches) {
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
        this.shop_name = data.shop_name;
        this.image = data.image;
        this.branch_name = data.branch_name;
        this.currency = data.currency;
        this.isPosEnabled = data.isPosEnabled;
        this.active = data.active;
    };
}