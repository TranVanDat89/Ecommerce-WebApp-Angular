import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ProductResponse } from '../../../responses/product.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageResponse } from '../../../responses/storage.response';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  products: Product[];
  productsWithMaxSolved: Product[];
  selectedYear: number = new Date().getFullYear();
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);
  // productDeleted?: Product;
  productNameDeleted: string = '';
  productIdDeleted: string = '';
  loadDataForYear(selectedYear: number) {

  }

  constructor(private productService: ProductService, private modalService: NgbModal) {
    this.products = [];
    this.productsWithMaxSolved = [];
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductsWithMaxSolved(this.selectedYear);
  }
  getAllProductsWithMaxSolved(year: number) {
    this.productService.getProductsWithMaxSolved(year).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Product[]>>) => {
        this.productsWithMaxSolved = apiResponse.data.products!;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
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

  onDelete(productName: string, productId: string, modal: any) {
    this.productNameDeleted = productName;
    this.productIdDeleted = productId;
    this.modalService.open(modal);
  }

  confirmDelete(productId?: string) {
    console.log(productId);
  }
}
