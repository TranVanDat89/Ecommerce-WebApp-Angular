import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { UserResponse } from '../../responses/user.response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  userResponse?: UserResponse | null;
  productId: string;
  product?: Product;
  constructor(private router: ActivatedRoute, private userService: UserService, private productService: ProductService) {
    this.productId = '';
  }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') ?? '';
    });
    this.getProductById(this.productId);
    console.log(this.userResponse);
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
}
