import { mySqlPool } from "../../db/db";

export class BranchGetFilters {
    readonly shop_id: number;
    constructor(data: any) {
        this.shop_id = data.shop_id;
    }
    getCondition() {
        const filterCondition = [
            this.shop_id ? "shop_id = " + mySqlPool.escape(this.shop_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}

export class BranchUpdateFilters {
    readonly branch_cat_id: string;
    readonly branch_name: string;
    readonly branch_addr: string;
    readonly phone_no: string;
    readonly currency: string;
    readonly maximum_distance: string;
    readonly minimum_sale: number;
    readonly open_time: string;
    readonly close_time: string;
    readonly isAdminDelivery: number;
    readonly isPosEnabled: number;
    readonly track_stock: number;
    readonly latitude: number;
    readonly longitude: number;
    readonly home_screen_theme: number;
    readonly welcomeMessage: string;
    readonly landmark: string;
    readonly image: string;
    readonly rad_three_rate: string;
    readonly rad_five_rate: string;
    readonly rad_ten_rate: string;
    readonly rad_fifteen_rate: string;
    readonly rad_twenty_rate: string;
    constructor(data: any) {
        this.branch_cat_id = data.branch_cat_id;
        this.branch_name = data.branch_name;
        this.branch_addr = data.branch_addr;
        this.phone_no = data.phone_no;
        this.currency = data.currency;
        this.maximum_distance = data.maximum_distance;
        this.minimum_sale = data.minimum_sale;
        this.open_time = data.open_time;
        this.close_time = data.close_time;
        this.isAdminDelivery = data.isAdminDelivery;
        this.isPosEnabled = data.isPosEnabled;
        this.track_stock = data.track_stock;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.home_screen_theme = data.home_screen_theme;
        this.welcomeMessage = data.welcomeMessage;
        this.landmark = data.landmark;
        this.image = data.image;
        this.rad_three_rate = data.rad_three_rate;
        this.rad_five_rate = data.rad_five_rate;
        this.rad_ten_rate = data.rad_ten_rate;
        this. rad_fifteen_rate = data.rad_fifteen_rate;
        this.rad_twenty_rate = data.rad_twenty_rate;
    }
    getCondition() {
        const filterCondition = [
            this.branch_cat_id ? "branch_cat_id = " + mySqlPool.escape(this.branch_cat_id) : "",
            this.branch_name ? "branch_name = " + mySqlPool.escape(this.branch_name) : "",
            this.branch_addr ? "branch_addr = " + mySqlPool.escape(this.branch_addr) : "",
            this.phone_no ? "phone_no = " + mySqlPool.escape(this.phone_no) : "",
            this.currency ? "currency = " + mySqlPool.escape(this.currency) : "",
            this.maximum_distance ? "maximum_distance = " + mySqlPool.escape(this.maximum_distance) : "",
            this.minimum_sale ? "minimum_sale = " + mySqlPool.escape(this.minimum_sale) : "",
            this.open_time ? "open_time = " + mySqlPool.escape(this.open_time) : "",
            this.close_time ? "close_time = " + mySqlPool.escape(this.close_time) : "",
            this.isAdminDelivery !== undefined ? "isAdminDelivery = " + mySqlPool.escape(this.isAdminDelivery) : "",
            this.isPosEnabled !== undefined ? "isPosEnabled = " + mySqlPool.escape(this.isPosEnabled) : "",
            this.track_stock !== undefined ? "track_stock = " + mySqlPool.escape(this.track_stock) : "",
            this.latitude ? "latitude = " + mySqlPool.escape(this.latitude) : "",
            this.longitude ? "longitude = " + mySqlPool.escape(this.longitude) : "",
            this.home_screen_theme ? "home_screen_theme = " + mySqlPool.escape(this.home_screen_theme) : "",
            this.welcomeMessage !== undefined ? "welcomeMessage = " + mySqlPool.escape(this.welcomeMessage) : "",
            this.landmark ? "landmark = " + mySqlPool.escape(this.landmark) : "",
            this.image ? "image = " + mySqlPool.escape(this.image) : "",
            this.rad_three_rate ? "rad_three_rate = " + mySqlPool.escape(this.rad_three_rate) : "",
            this.rad_five_rate ? "rad_five_rate = " + mySqlPool.escape(this.rad_five_rate) : "",
            this.rad_ten_rate ? "rad_ten_rate = " + mySqlPool.escape(this.rad_ten_rate) : "",
            this.rad_fifteen_rate ? "rad_fifteen_rate = " + mySqlPool.escape(this.rad_fifteen_rate) : "",
            this.rad_twenty_rate ? "rad_twenty_rate = " + mySqlPool.escape(this.rad_twenty_rate) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}