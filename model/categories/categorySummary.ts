export class CategorySummary {
    category_id: string;
    category_name: string;
    category_icon: number;
    constructor(data: any) {
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.category_icon = data.category_icon;
    };
}