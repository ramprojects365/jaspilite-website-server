export class BranchSummary {
    shop_id: string;
    branch_id: string;
    branch_cat_id: string;
    branch_name: string;
    latitude: number;
    longitude: number;
    landmark: string;
    image: string;
    active: number;
    constructor(data: any) {
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
        this.branch_cat_id = data.branch_cat_id;
        this.branch_name = data.branch_name;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.landmark = data.landmark;
        this.image = data.image;
        this.active = data.active;
    };
}

export class BranchCategorySummary {
    category_id: string;
    category_name: string;
    category_icon: number;
    constructor(data: any) {
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.category_icon = data.category_icon;
    };
}