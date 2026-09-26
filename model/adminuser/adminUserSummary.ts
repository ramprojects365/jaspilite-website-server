export class AdminUserSummary {
    admin_id: string;
    display_name: string;
    user_type: string;
    email: string;
    status: string;
    branch_name: string;
    constructor(data: any) {
        console.log(JSON.stringify(data));
        this.admin_id = data.id;
        this.display_name = data.displayName;
        this.user_type = data.user_type;
        this.email = data.email;
        this.status = data.status;
        this.branch_name = data.branch_name;
    };
}