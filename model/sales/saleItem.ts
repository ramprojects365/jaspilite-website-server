export class SaleItem {
    sales_details_id: string;
    sales_id: number;
    product_id: number;
    item_id: number;
    quantity: string;
    item_price: number;
    discount: string;
    constructor(data: any) {
        this.sales_details_id = data.sales_details_id;
        this.sales_id = data.sales_id;
        this.product_id = data.product_id;
        this.item_id = data.item_id;
        this.quantity = data.quantity;
        this.item_price = data.item_price;
        this.discount = data.discount;
    };
}