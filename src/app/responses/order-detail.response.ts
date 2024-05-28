import { Order } from "../models/order";
import { DetailResponse } from "./detail.response";

export interface OrderDetailResponse {
    order: Order;
    detailResponses: DetailResponse[]
}