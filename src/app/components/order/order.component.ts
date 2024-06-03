import { TokenInterceptor } from './../../interceptors/token.interceptor';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../responses/product.response';
import { ApiResponse } from '../../responses/api.response';
import { UserResponse } from '../../responses/user.response';
import { UserService } from '../../services/user.service';
import { Cart } from '../../responses/cart.response';
import { StorageResponse } from '../../responses/storage.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  cart?: Cart;
  selectedFlavor?: string;
  constructor(private cartService: CartService, private router: Router) {
  }
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartService.getCart().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  removeItemFromCart(productId: string) {
    console.log(productId);
    this.cartService.removeFromCart(productId).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart);
        this.router.navigate(['/order']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  decreaseQuantity(index: number): void {
    if (this.cart === undefined) return;
    if (this.cart.cartItems[index].quantity <= 1) return;
    this.cart.cartItems[index].quantity -= 1;
  }

  increaseQuantity(index: number): void {
    if (this.cart === undefined) return;
    this.cart.cartItems[index].quantity += 1;
  }
  onFlavorSelect(event: Event, index: number) {
    if (this.cart === undefined) return;
    this.cart.cartItems[index].flavorName = (event.target as HTMLSelectElement).value;
  }
  updateCart() {
    debugger
    this.cartService.updateCart(this?.cart!).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  private updateCartFromCartItems(): void {

  }
}
