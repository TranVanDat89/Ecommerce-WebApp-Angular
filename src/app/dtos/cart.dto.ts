export class UpdateCartRequest {
    productId: string;
    quantity: number;
    flavorName: string;
    constructor(updateCartRequest: any) {
        this.productId = updateCartRequest.productId;
        this.quantity = updateCartRequest.quantity;
        this.flavorName = updateCartRequest.flavorName;
    }
}