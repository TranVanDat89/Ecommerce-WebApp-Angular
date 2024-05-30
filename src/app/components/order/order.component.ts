import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../responses/product.response';
import { ApiResponse } from '../../responses/api.response';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  cart: Map<string, { quantity: number, flavorName: string }> = new Map();
  cartItems: { product: Product, quantity: number, flavorName: string }[] = [];
  constructor(private cartService: CartService, private productService: ProductService) { }
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if (this.cart.size !== 0) {
      const productInfors: Map<string, { quantity: number, flavorName: string }> = new Map();
      this.cart.forEach((value, key) => {
        productInfors.set(key, value);
      });
      this.getProductsFromCart(productInfors);
    }
    console.log(this.cartItems)
  }
  getProductsFromCart(productInfors: Map<string, { quantity: number, flavorName: string }>) {
    productInfors.forEach((value, key) => {
      this.productService.getProductById(key).subscribe({
        next: (apiResponse: ApiResponse<any>) => {
          const { product } = apiResponse.data;
          this.cartItems.push({ product, quantity: value.quantity, flavorName: value.flavorName });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? '');
        }
      })
    })
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
}
