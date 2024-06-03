import { CartItem } from "./cart.item.response";

export interface Cart {
    id: string;
    userId: string;
    totalPrice: number;
    cartItems: CartItem[]
}