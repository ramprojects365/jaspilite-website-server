export class ProductSummary {
    product_id: number;
    category_id: number;
    category_name: string;
    company: string;
    name: string;
    image: string;
    description: string;
    weight: number;
    sku: string;
    constructor(data: any) {
        this.product_id = data.product_id;
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.company = data.company;
        this.name = data.name;
        this.image = data.image;
        this.description = data.description;
        this.weight = data.weight;
        this.sku = data.sku;
    };
}