import { Flavor } from './../../models/flavor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { UserResponse } from '../../responses/user.response';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  userResponse?: UserResponse | null;
  productId: string;
  quantity: number;
  product?: Product;
  flavorName: string;
  constructor(private router: ActivatedRoute, private cartService: CartService, private userService: UserService, private productService: ProductService) {
    this.productId = '';
    this.quantity = 1;
    this.flavorName = '';
  }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') ?? '';
    });
    this.getProductById(this.productId);
  }
  addToCart(): void {
    this.cartService.addToCart(this.productId, this.quantity, this.flavorName);
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  getProductById(productId: string) {
    this.productService.getProductById(productId).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        const { product } = apiResponse.data;
        console.log(apiResponse.data, product)
        this.product = product;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
