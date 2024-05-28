import { Order } from "../models/order";
import { DetailReponse } from "./detail.response";

export interface OrderDetailReponse {
    order: Order;
    detailReponses: DetailReponse[]
}