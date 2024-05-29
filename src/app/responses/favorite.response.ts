import { Product } from "../models/product";

export interface FavoriteResponse {
    id: string;
    product: Product;
}