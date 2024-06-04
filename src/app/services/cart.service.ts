import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../responses/user.response';
import { StorageResponse } from './../responses/storage.response';
import { Injectable, inject } from '@angular/core';
import { HttpUtilService } from './http-util.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { Cart } from '../responses/cart.response';
import { CartItem } from '../responses/cart.item.response';
import { CartRequest } from '../dtos/cart.request';

@Injectable({
  providedIn: 'root'
})
export class CartService {// Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  private apiAddToCart = `${environment.apiBaseUrl}/carts/add-to-cart`;
  private apiGetMycart = `${environment.apiBaseUrl}/carts/my-cart`;
  private apiRemoveItemFromCart = `${environment.apiBaseUrl}/carts/delete-item`;
  private apiUpdateCart = `${environment.apiBaseUrl}/carts/update-cart/`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);
  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() {
  }
  addToCart(productId: string, quantity: number, flavorName: string): Observable<ApiResponse<StorageResponse<Cart>>> {
    return this.http.post<ApiResponse<StorageResponse<Cart>>>(this.apiAddToCart + `?productId=${productId}&quantity=${quantity}&flavorName=${flavorName}`, this.apiConfig);
  }
  getCart(): Observable<ApiResponse<StorageResponse<Cart>>> {
    return this.http.get<ApiResponse<StorageResponse<Cart>>>(this.apiGetMycart);
  }
  removeFromCart(productId: string): Observable<ApiResponse<StorageResponse<Cart>>> {
    return this.http.get<ApiResponse<StorageResponse<Cart>>>(this.apiRemoveItemFromCart + `?productId=${productId}`);
  }
  updateCart(cartId: string, cartUpdate: CartRequest[]): Observable<ApiResponse<StorageResponse<Cart>>> {
    return this.http.post<ApiResponse<StorageResponse<Cart>>>(this.apiUpdateCart + cartId, cartUpdate, this.apiConfig);
  }
}
