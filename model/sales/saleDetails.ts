export class SaleDetails {
    sales_details_id: string;
    product_id: number;
    name: string;
    item_qr_code: string;
    articleNumber: string;
    image: string;
    quantity: number;
    item_price: number;
    discount: number;
    constructor(data: any) {
        this.sales_details_id = data.sales_details_id;
        this.product_id = data.product_id;
        this.name = data.name;
        this.item_qr_code = data.item_qr_code;
        this.articleNumber = data.articleNumber;
        this.image = data.image;
        this.quantity = data.quantity;
        this.item_price = data.item_price;
        this.discount = data.discount;
    };
}