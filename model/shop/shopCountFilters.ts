import { mySqlPool } from "../../db/db";

export class ShopGetCountFilters {
    readonly user_id: number;
    constructor(data: any) {
        this.user_id = data.user_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "a.id = " + mySqlPool.escape(this.user_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}