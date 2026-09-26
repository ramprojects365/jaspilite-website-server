import { mySqlPool } from "../../db/db";


export class CategoryUpdateFilters {
    readonly category_name: string;
    readonly category_icon: string;
    constructor(data: any) {
        this.category_name = data.category_name;
        this.category_icon = data.category_icon;
    }
    getCondition() {
        const filterCondition = [
            this.category_name ? "category_name = " + mySqlPool.escape(this.category_name) : "",
            this.category_icon ? "category_icon = " + mySqlPool.escape(this.category_icon) : true,
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}