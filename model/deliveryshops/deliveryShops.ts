import * as dbModel from "../../db/model_created";

export class deliveryShops {
    delivery_shop_id: number;
    vendor_id: number;
    branch_id: number;
    constructor(data: dbModel.DeliveryShops) {
        this.delivery_shop_id = data.delivery_shop_id;
        this.vendor_id = data.vendor_id;
        this.branch_id = data.branch_id;
    };
}