import { mySqlPool } from "../../db/db";

export class ShopGetFilters {
    readonly user_id: number;
    readonly shop_id: number;
    constructor(data: any) {
        this.user_id = data.user_id;
        this.shop_id = data.shop_id;
    }
    getCondition() {
        const filterCondition = [
            this.shop_id ? "s.shop_id = " + mySqlPool.escape(this.shop_id) : true,
            this.user_id ? "a.id = " + mySqlPool.escape(this.user_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class ShopUpdateFilters {
    readonly shop_name: string;
    readonly shop_addr: string;
    constructor(data: any) {
        this.shop_name = data.shop_name;
        this.shop_addr = data.shop_addr;
    }
    getCondition() {
        const filterCondition = [
            this.shop_name ? "shop_name = " + mySqlPool.escape(this.shop_name) : "",
            this.shop_addr ? "shop_addr = " + mySqlPool.escape(this.shop_addr) : true,
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}