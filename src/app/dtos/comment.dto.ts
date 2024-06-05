export interface CommentDTO {
    productId: string;
    userId: string;
    content: string;
    star: number;
    orderId?: string;
}