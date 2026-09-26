export class SaleStatus {
    status_id: number;
    sales_id: string;
    status: string;
    updated_by: string;
    date: string;
    constructor(data: any) {
        this.status_id = data.status_id;
        this.sales_id = data.sales_id;
        this.status = data.status;
        this.updated_by = data.updated_by;
        this.date = data.date;
    };
}