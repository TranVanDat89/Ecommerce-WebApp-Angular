import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../responses/product.response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  top4Product: Product[];
  constructor(private router: Router, private productService: ProductService) {
    this.top4Product = [];
  }
  ngOnInit(): void {
    this.getTop4();
  }
  getTop4() {
    this.productService.getTop4().subscribe({
      next: (apiResponse: ApiResponse<ProductResponse>) => {
        this.top4Product = apiResponse.data.products;
        console.log(apiResponse.data, this.top4Product)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
