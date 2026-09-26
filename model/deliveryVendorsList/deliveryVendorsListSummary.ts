import * as dbModel from "../../db/model_created";

export class deliveryVendorsListSummary {
    delivery_vendor_id: number;
    del_ven_name: number;
    del_ven_endpoint: string;
    key: string;
    secret: string;
    country: number;
    constructor(data: dbModel.deliveryVendorsList) {
        this.delivery_vendor_id = data.delivery_vendor_id;
        this.del_ven_name = data.del_ven_name;
        this.del_ven_endpoint = data.del_ven_endpoint;
        this.key = data.key;
        this.secret = data.secret;
        this.country = data.country;
    };
}

export class deliveryVendorsOfBranch {

    delivery_vendor_id: number;
    del_ven_name: string;
    del_ven_endpoint: string;
    key: string;
    secret: string;
    country: string;
    delivery_shop_id: number;
    vendor_id: number;
    branch_id: number;
    status: number;
    constructor(data: dbModel.DeliveryVendorsOfBranch) {
        this.delivery_vendor_id = data.delivery_vendor_id;
        this.del_ven_name = data.del_ven_name;
        this.del_ven_endpoint = data.del_ven_endpoint;
        this.key = data.key;
        this.secret = data.secret;
        this.country = data.country;
        this.delivery_shop_id = data.delivery_shop_id;
        this.vendor_id = data.vendor_id;
        this.branch_id = data.branch_id;
        this.status = data.status;
    };
}
