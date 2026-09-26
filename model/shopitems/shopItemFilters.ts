import { mySqlPool } from "../../db/db";

export class ShopItemGetFilters {
    readonly branch_id: number;
    readonly product_id: number;
    readonly category_id: number;
    constructor(data: any) {
        this.branch_id = data.branch_id;
        this.product_id = data.product_id;
        this.category_id = data.category_id;
    }
    getCondition() {
        const filterCondition = [
            this.branch_id ? "si.branch_id = " + mySqlPool.escape(this.branch_id) : true,
            this.product_id ? "si.product_id = " + mySqlPool.escape(this.product_id) : true,
            this.category_id ? "p.category_id = " + mySqlPool.escape(this.category_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class ShopItemUpdateFilters {
    readonly item_price: string;
    readonly item_discount: string;
    readonly remarks: string;
    readonly max_items_per_order: string;
    readonly item_qr_code: string;
    readonly articleNumber: string;
    readonly max_quantity: number;
    readonly item_quantity: string;
    readonly availability: boolean;
    readonly hidden: boolean;
    constructor(data: any) {
        this.item_price = data.item_price;
        this.item_discount = data.item_discount;
        this.remarks = data.remarks;
        this.max_items_per_order = data.max_quantity;
        this.item_qr_code = data.item_qr_code;
        this.articleNumber = data.articleNumber;
        this.max_quantity = data.max_quantity;
        this.item_quantity = data.item_quantity;
        this.availability = data.availability;
        this.hidden = data.hidden;
    }
    getCondition() {
        const filterCondition = [
            this.item_price ? "item_price = " + mySqlPool.escape(this.item_price) : "",
            this.item_discount ? "item_discount = " + mySqlPool.escape(this.item_discount) : "",
            this.remarks ? "remarks = " + mySqlPool.escape(this.remarks) : "",
            this.item_qr_code ? "item_qr_code = " + mySqlPool.escape(this.item_qr_code) : "",
            this.item_qr_code ? "item_qr_code = " + mySqlPool.escape(this.item_qr_code) : "",
            this.articleNumber ? "articleNumber = " + mySqlPool.escape(this.articleNumber) : "",
            this.max_items_per_order ? "max_items_per_order = " + mySqlPool.escape(this.max_quantity) : "",
            (this.availability == true || this.availability === false) ? "availability = " + mySqlPool.escape(this.availability) : "",
            (this.hidden == true || this.hidden === false) ? "hidden = " + mySqlPool.escape(this.hidden) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}