import * as dbModel from "../../db/model_created";

export class ShopSummary {
    shop_id: number;
    shop_name: string;
    shop_addr: string;
    constructor(data: dbModel.shops) {
        this.shop_id = data.shop_id;
        this.shop_name = data.shop_name;
        this.shop_addr = data.shop_addr;
    };
}