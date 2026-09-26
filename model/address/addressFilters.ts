import { mySqlPool } from "../../db/db";

export class AddressGetFilters {
    readonly address_id: number;
    constructor(data: any) {
        this.address_id = data.address_id;
    }
    getCondition() {
        const filterCondition = [
            this.address_id ? "address_id = " + mySqlPool.escape(this.address_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
