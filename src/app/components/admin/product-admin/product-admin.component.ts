import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ProductResponse } from '../../../responses/product.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  products: Product[];
  constructor(private productService: ProductService) {
    this.products = [];
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProductsWithoutPagination().subscribe({
      next: (apiResponse: ApiResponse<ProductResponse>) => {
        const response = apiResponse.data;
        this.products = response.products;
        // this.totalPages = response.totalPages;
        // this.totalItems = this.products.length;
        // console.log(apiResponse.data)
      }
      , error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
