import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  product?: Product;
  constructor(private router: ActivatedRoute, private productService: ProductService) {
    this.productId = '';
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') ?? '';
    });
    this.getProductById(this.productId);
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
