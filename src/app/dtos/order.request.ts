import { CartRequest } from "./cart.request";

export interface OrderRequest {
    userId: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    note: string;
    totalMoney: number;
    shippingMethod: string;
    paymentMethod: string;
    cartItems: CartRequest[];
}