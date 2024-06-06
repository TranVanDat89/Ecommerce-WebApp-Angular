import { CartItem } from './../../responses/cart.item.response';
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
import { StorageResponse } from '../../responses/storage.response';
import { Cart } from '../../responses/cart.response';
import { Comment } from '../../models/comment';

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
  comments?: Comment[];
  rating: number = 0;
  itemsPerPage: number;
  currentPage: number;
  constructor(private router: ActivatedRoute, private cartService: CartService, private userService: UserService, private productService: ProductService) {
    this.productId = '';
    this.quantity = 1;
    this.flavorName = '';
    this.itemsPerPage = 5;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') ?? '';
    });
    this.getProductById(this.productId);
    this.getAllCommentsByProductId(this.productId);
  }
  addToCart(): void {
    this.cartService.addToCart(this.productId, this.quantity, this.flavorName).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data.cart);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
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
  getAllCommentsByProductId(productId: string) {
    this.productService.getCommentsByProductId(productId).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Comment[]>>) => {
        this.comments = apiResponse.data.comments;
        console.log(this.comments);

        if (this.comments?.length) {
          this.rating = this.comments?.reduce((sum, comment) => sum + comment.star, 0) / this.comments?.length
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  getStarsArray(star: number): any[] {
    return new Array(Math.floor(star));
  }
  getHalfStarArray(rating: number): number[] {
    return (rating % 1) >= 0.5 ? [0] : [];
  }

  // Method to get empty stars array
  getEmptyStarsArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return Array(emptyStars).fill(0).map((_, index) => index);
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
