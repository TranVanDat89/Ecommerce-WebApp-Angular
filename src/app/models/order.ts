export interface Order {
    id: string;
    fullName: string;
    phoneNumber: string;
    note: string;
    isCommented: boolean;
    status: string;
    totalMoney: number;
    shippingMethod: string;
    shippingAddress: string;
    shippingDate: string;
    trackingNumber: string;
    paymentMethod: string;
    active: boolean;
}