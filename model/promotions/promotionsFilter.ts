import { mySqlPool } from "../../db/db";
const moment = require('moment');

export class PromotionsGetFilters {
    readonly branch_id: number;
    constructor(data: any) {
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.branch_id ? " branch_id = " + mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class PromotionUpdateFilters {
    readonly title: string;
    readonly description: string;
    readonly start_date: string;
    readonly end_date: string;
    readonly picture: string;
    readonly discount: string;
    readonly status: string;
    constructor(data: any) {
        this.title = data.title;
        this.description = data.description;
        this.start_date = moment(data.start_date, 'YYYY-MM-DD').unix();
        this.end_date = moment(data.end_date, 'YYYY-MM-DD').unix();
        this.picture = data.picture;
        this.discount = data.discount;
        this.status = data.status;
    }
    getCondition() {
        const filterCondition = [
            this.title ? "title = " + mySqlPool.escape(this.title) : "",
            this.description ? "description = " + mySqlPool.escape(this.description) : true,
            this.start_date ? "start_date = " + mySqlPool.escape(this.start_date) : true,
            this.end_date ? "end_date = " + mySqlPool.escape(this.end_date) : true,
            this.picture ? "picture = " + mySqlPool.escape(this.picture) : true,
            "all_discount_percentage = " + mySqlPool.escape(this.discount),
            this.status ? "status = " + mySqlPool.escape(this.status) : true,
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}

export class PromotionItemsGetFilters {
    readonly promo_id: number;
    constructor(data: any) {
        this.promo_id = data.promo_id;
    }
    getCondition() {
        const filterCondition = [
            this.promo_id ? " promo_id = " + mySqlPool.escape(this.promo_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

