import { mySqlPool } from "../../db/db";

export class AdminUserGetFilters {
    readonly user_id: number;
    readonly shop_id: string;
    readonly branch_id: number;
    constructor(data: any) {
        this.user_id = data.user_id;
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "a.id = " + mySqlPool.escape(this.user_id) : true,
            this.shop_id ? "a.shop_id in (" + mySqlPool.escape(this.shop_id.split(',')) + ")" : true,
            this.branch_id ? "a.branch_id = " + mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class UserUpdateFilters {
    readonly display_name: string;
    readonly user_type: string;
    readonly plain_pass: string;
    readonly hash: string;
    readonly status: string;
    constructor(data: any, plain_pass: string, hash: string) {
        this.display_name = data.display_name;
        this.user_type = data.user_type;
        this.plain_pass = plain_pass;
        this.hash = hash;
        this.status = data.status;
    }
    getCondition() {
        const filterCondition = [
            this.display_name ? "displayName = " + mySqlPool.escape(this.display_name) : "",
            (this.user_type && this.user_type == 'sadmin') ? "user_type = 'sadmin'" : "",
            (this.user_type && this.user_type == 'nadmin') ? "user_type = 'nadmin'" : "",
            (this.user_type && this.user_type == 'manager') ? "user_type = 'manager'" : "",
            (this.user_type && this.user_type == 'employee') ? "user_type = 'employee'" : "",
            (this.plain_pass && this.plain_pass != "" ? "password = '" + this.hash + "'" : ""),
            this.status ? "status = " + mySqlPool.escape(this.status) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}