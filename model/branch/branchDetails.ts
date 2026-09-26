export class BranchDetails {

    branch_id: string;
    shop_id: string;
    branch_cat_id: string;
    branch_name: string;
    branch_addr: string;
    phone_no: string;
    currency: string;
    maximum_distance: string;
    minimum_sale: number;
    open_time: string;
    close_time: string;
    isAdminDelivery: number;
    isPosEnabled: number;
    track_stock: number;
    latitude: number;
    longitude: number;
    home_screen_theme: number;
    welcomeMessage: string;
    landmark: string;
    image: string;
    rad_three_rate: string;
    rad_five_rate: string;
    rad_ten_rate: string;
    rad_fifteen_rate: string;
    rad_twenty_rate: string;
    active: number;

    constructor(data: any) {
        this.branch_id = data.branch_id;
        this.shop_id = data.shop_id;
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
        this.rad_fifteen_rate = data.rad_fifteen_rate;
        this.rad_twenty_rate = data.rad_twenty_rate;
        this.active = data.active;
    };
}