export class AddressSummary {
    address_id: number;
    uid: string;
    unit_number: string;
    condo_name: string;
    address: string;
    pin_code: string;
    latitude: string;
    logitude: string;
    active: number;
    constructor(data: any) {
        this.address_id = data.address_id;
        this.uid = data.uid;
        this.unit_number = data.unit_number;
        this.condo_name = data.condo_name;
        this.address = data.address;
        this.pin_code = data.pin_code;
        this.latitude = data.latitude;
        this.logitude = data.logitude;
        this.active = data.active;
    };
}