export interface Order {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    note: string;
    isCommented: boolean;
    status: string;
    totalMoney: string;
    shippingMethod: string;
    shippingAddress: string;
    shippingDate: string;
    trackingNumber: string;
    paymentMethod: string;
    active: boolean;
}