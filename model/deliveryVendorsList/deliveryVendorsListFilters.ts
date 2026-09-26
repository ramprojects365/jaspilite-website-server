import { mySqlPool } from "../../db/db";

export class deliveryvendorsListFilters {
    readonly country: string;
    constructor(data: any) {
        this.country = data.country;
    }
    getCondition() {
        const filterCondition = [
            this.country ? "country = " + mySqlPool.escape(this.country) : true,
        ].join(" AND ");
        return filterCondition;
    }
}