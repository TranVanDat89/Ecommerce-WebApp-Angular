import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductResponse } from '../../responses/product.response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  categories: Category[];
  products: Product[];
  totalPages: number;
  visiblePages: number[];
  localStorage?: Storage;
  itemsPerPage: number;
  currentPage: number;
  constructor(private router: Router, private categoryService: CategoryService, private productService: ProductService) {
    this.categories = [];
    this.totalPages = 0;
    this.visiblePages = [];
    this.products = [];
    this.currentPage = 0;
    this.itemsPerPage = 9;
  }
  ngOnInit(): void {
    this.currentPage = Number(this.localStorage?.getItem('currentProductPage')) || 0;
    this.getCategories();
    this.getAllProducts(1, 9);
  }
  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentProductPage', String(this.currentPage));
    this.getAllProducts(this.currentPage, this.itemsPerPage);
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        console.log(apiResponse.data)
        const { categories } = apiResponse.data;
        this.categories = categories;
        console.log(this.categories);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  getAllProducts(page: number, limit: number) {
    this.productService.getAllProducts(page, limit).subscribe({
      next: (apiResponse: ApiResponse<ProductResponse>) => {
        const response = apiResponse.data;
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        console.log(apiResponse.data)
      }
      , error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }
  onProductClick(productId: string) {
    this.router.navigate(['/products/product-detail', productId]);
  }
}
