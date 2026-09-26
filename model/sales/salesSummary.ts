export class SaleSummary {
    displayName: string;
    phoneNumber: number;
    email: string;
    sales_id: number;
    salesIdString: string;
    remarks: string;
    branch_id: number;
    branch_name: string;
    address_id: number;
    date: string;
    total: number;
    discount: number;
    delivery_charge: number;
    users_vouchers_id: string;
    voucher_discount: number;
    status: string;
    constructor(data: any) {
        this.displayName = data.displayName;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.sales_id = data.sales_id;
        this.salesIdString = data.salesIdString;
        this.remarks = data.remarks;
        this.branch_id = data.branch_id;
        this.branch_name = data.branch_name;
        this.address_id = data.address_id;
        this.date = data.date;
        this.total = data.total;
        this.discount = data.discount;
        this.delivery_charge = data.delivery_charge;
        this.users_vouchers_id = data.users_vouchers_id;
        this.voucher_discount = data.voucher_discount;
        this.status = data.status;
    };
}