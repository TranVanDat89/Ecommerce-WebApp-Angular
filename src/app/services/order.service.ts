import { HttpUtilService } from './http-util.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { StorageResponse } from '../responses/storage.response';
import { OrderDetailResponse } from '../responses/order-detail.response';
import { OrderRequest } from '../dtos/order.request';
import { Order } from '../models/order';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiOrderDetail = `${environment.apiBaseUrl}/orders/order-detail/`;
  private apiCreateOrder = `${environment.apiBaseUrl}/orders/create-order`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);

  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() { }
  getOrderDetail(userId: string): Observable<ApiResponse<StorageResponse<OrderDetailResponse[]>>> {
    return this.http.get<ApiResponse<StorageResponse<OrderDetailResponse[]>>>(this.apiOrderDetail + `${userId}`);
  }

  createOrder(orderRequest: OrderRequest): Observable<ApiResponse<StorageResponse<Order>>> {
    debugger
    return this.http.post<ApiResponse<StorageResponse<Order>>>(this.apiCreateOrder, orderRequest, this.apiConfig);
  }
}
