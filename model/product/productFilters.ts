import { mySqlPool } from "../../db/db";

export class ProductGetFilters {
    readonly product_id: number;
    readonly category_id: number;
    constructor(data: any) {
        this.product_id = data.product_id;
        this.category_id = data.category_id;
    }
    getCondition() {
        const filterCondition = [
            this.product_id ? "p.product_id = " + mySqlPool.escape(this.product_id) : true,
            this.category_id ? "p.category_id = " + mySqlPool.escape(this.category_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class ProductUpdateFilters {
    readonly category_id: string;
    readonly company: string;
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly weight: number;
    readonly sku: string;
    constructor(data: any) {
        this.category_id = data.category_id;
        this.company = data.company;
        this.name = data.name;
        this.image = data.image;
        this.description = data.description;
        this.weight = data.weight;
        this.sku = data.sku;
    }
    getCondition() {
        const filterCondition = [
            this.category_id ? "category_id = " + mySqlPool.escape(this.category_id) : true,
            this.company ? "company = " + mySqlPool.escape(this.company) : true,
            this.name ? "name = " + mySqlPool.escape(this.name) : true,
            this.image ? "image = " + mySqlPool.escape(this.image) : "",
            this.description ? "description = " + mySqlPool.escape(this.description) : "",
            this.weight ? "weight = " + mySqlPool.escape(this.weight) : "",
            this.sku ? "sku = " + mySqlPool.escape(this.sku) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}