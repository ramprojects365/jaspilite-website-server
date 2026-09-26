import { mySqlPool } from "../../db/db";

export class SalesGetFilters {
    readonly branch_id: number;
    readonly sales_id: number;
    readonly status: string;
    readonly from: string;
    readonly to: string;
    readonly exactDate: string;
    constructor(data: any) {
        this.branch_id = data.branch_id;
        this.sales_id = data.sales_id;
        this.status = data.status;
        this.from = data.from;
        this.to = data.to;
        this.exactDate = data.exact_date;
    }
    getCondition() {
        const filterCondition = [
            this.branch_id ? "s.branch_id = " + mySqlPool.escape(this.branch_id) : true,
            this.sales_id ? "s.sales_id = " + mySqlPool.escape(this.sales_id) : true,
            this.from ? "s.date > " + mySqlPool.escape(this.from) : true,
            this.to ? "s.date <= " + mySqlPool.escape(this.to) : true,
            this.exactDate ? "DATE(s.date) = " + mySqlPool.escape(this.exactDate) : true,
            this.status === 'active' ? "(sstat.status !='DELIVERED' AND sstat.status !='Cancelled')" : true,
            this.status === 'billing' ? "(sstat.status ='DELIVERED' OR sstat.status ='ORDERED')" : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class SaleDetailsFilters {
    readonly sales_id: number;
    constructor(data: any) {
        this.sales_id = data.sales_id;
    }
    getCondition() {
        const filterCondition = [
            this.sales_id ? "sales_id = " + mySqlPool.escape(this.sales_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class SalesItemUpdateFilters {
    readonly quantity: string;
    constructor(data: any) {
        this.quantity = data.quantity;
    }
    getCondition() {
        const filterCondition = [
            this.quantity ? "quantity = " + mySqlPool.escape(this.quantity) : ""
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}

export class SalesCountFilters {
    readonly user_id: number;
    readonly branch_id: number;
    constructor(data: any) {
        this.user_id = data.user_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "adm.id = " + mySqlPool.escape(this.user_id) : true,
            this.branch_id ? "brn.branch_id = " + mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class SalesAmountFilters {
    readonly user_id: number;
    readonly branch_id: number;
    constructor(data: any) {
        this.user_id = data.user_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "adm.id = " + mySqlPool.escape(this.user_id) : true,
            this.branch_id ? "brn.branch_id = " + mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}