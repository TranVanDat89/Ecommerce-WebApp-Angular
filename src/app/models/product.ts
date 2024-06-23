import { Ingredient } from "./ingredient";
import { ProductDetail } from "./product.detail";
import { ProductImage } from "./product.image";

export interface Product {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
    quantity: number;
    solved: number;
    ingredient: Ingredient;
    productDetail: ProductDetail;
    productImages: ProductImage[];
    isDeleted: boolean;
}