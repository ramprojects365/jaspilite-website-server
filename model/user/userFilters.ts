import { mySqlPool } from "../../db/db";

export class UserGetFilters {
    readonly uid: number;
    constructor(data: any) {
        this.uid = data.uid;
    }
    getCondition() {
        const filterCondition = [
            this.uid ? "uid = " + mySqlPool.escape(this.uid) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
/*
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
*/