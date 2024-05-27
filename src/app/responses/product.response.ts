import { Product } from "../models/product";

export interface ProductResponse {
    totalPages?: number,
    products: Product[]
}