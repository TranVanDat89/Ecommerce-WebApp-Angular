import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../responses/user.response';
import { StorageResponse } from './../responses/storage.response';
import { Injectable, inject } from '@angular/core';
import { HttpUtilService } from './http-util.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<string, { quantity: number, flavorName: string }>;// Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  private apiAddToCart = `${environment.apiBaseUrl}/carts/add-to-cart`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);
  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() {
    this.cart = new Map<string, { quantity: number, flavorName: string }>();
    this, this.refreshCart();
  }
  private saveCartToLocalStorage(): void {
    localStorage?.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }
  getCart(): Map<string, { quantity: number, flavorName: string }> {
    return this.cart;
  }
  private getCartKey(): string {
    // debugger
    if (!localStorage?.getItem('user')) return 'cart:';
    const userResponseJSON = localStorage?.getItem('user');
    const storageResponse: StorageResponse<UserResponse> = JSON.parse(userResponseJSON!);
    return `cart:${storageResponse.userResponse?.id ?? ''}`;
  }
  addToCart(productId: string, quantity: number = 1, flavorName?: string): void {

    // if (this.cart.has(productId)) {
    //   // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên `quantity`
    //   const quant = this.cart.get(productId)!.quantity + quantity;
    //   this.cart.set(productId, { quantity: quant, flavorName: flavorName || '' });
    // } else {
    //   // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số lượng là `quantity`
    //   this.cart.set(productId, { quantity, flavorName: flavorName || '' });
    // }
    // // Sau khi thay đổi giỏ hàng, lưu trữ nó vào localStorage
    // this.saveCartToLocalStorage();
  }
  removeFromCart(productId: string) {
    this.cart.delete(productId);
    this.saveCartToLocalStorage();
  }
  setCart(cart: Map<string, { quantity: number, flavorName: string }>) {
    this.cart = cart ?? new Map<string, { quantity: number, flavorName: string }>();
    this.saveCartToLocalStorage();
  }
  // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
  clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartToLocalStorage(); // Lưu giỏ hàng mới vào Local Storage (trống)
  }
  public refreshCart() {
    const storedCart = localStorage?.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    } else {
      this.cart = new Map<string, { quantity: number, flavorName: string }>();
    }
  }
}
