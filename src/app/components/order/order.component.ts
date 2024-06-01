import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../responses/product.response';
import { ApiResponse } from '../../responses/api.response';
import { UserResponse } from '../../responses/user.response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  cart: Map<string, { quantity: number, flavorName: string }> = new Map();
  cartItems: { product: Product, quantity: number, flavorName: string }[] = [];
  totalMoneys: number = 0;
  constructor(private cartService: CartService, private productService: ProductService, private userService: UserService) { }
  ngOnInit(): void {
    if (this.userService.getUserResponseFromLocalStorage()) {
      this.cart = this.cartService.getCart();
    }
    if (this.cart.size !== 0) {
      const productInfors: Map<string, { quantity: number, flavorName: string }> = new Map();
      this.cart.forEach((value, key) => {
        productInfors.set(key, value);
      });
      this.getProductsFromCart(productInfors);
    }
    console.log(this.cartItems);
  }
  getProductsFromCart(productInfors: Map<string, { quantity: number, flavorName: string }>) {
    productInfors.forEach((value, key) => {
      this.productService.getProductById(key).subscribe({
        next: (apiResponse: ApiResponse<any>) => {
          const { product } = apiResponse.data;
          this.cartItems.push({ product, quantity: value.quantity, flavorName: value.flavorName });
          this.totalMoneys += product.price * value.quantity;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? '');
        }
      })
    })
  }
  removeProductFromCart(index: number) {
    // this.cartService.removeFromCart(productId);
    this.cartItems.splice(index, 1);
    // Cập nhật lại this.cart từ this.cartItems
    this.updateCartFromCartItems();
    // Tính toán lại tổng tiền
    this.calculateTotal();
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      // Cập nhật lại this.cart từ this.cartItems
      this.updateCartFromCartItems();
      this.calculateTotal();
    }
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    // Cập nhật lại this.cart từ this.cartItems
    this.updateCartFromCartItems();
    this.calculateTotal();
  }

  // Hàm tính tổng tiền
  calculateTotal(): void {
    this.totalMoneys = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  private updateCartFromCartItems(): void {
    this.cart.clear();
    this.cartItems.forEach((item) => {
      this.cart.set(item.product.id, { quantity: item.quantity, flavorName: item.flavorName });
    });
    this.cartService.setCart(this.cart);
  }
}
