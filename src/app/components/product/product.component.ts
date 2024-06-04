import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductResponse } from '../../responses/product.response';
import { UserResponse } from '../../responses/user.response';
import { UserService } from '../../services/user.service';
import { StorageResponse } from '../../responses/storage.response';
import { Cart } from '../../responses/cart.response';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  userResponse?: UserResponse | null;
  categories: Category[];
  products: Product[];
  // totalPages?: number;
  localStorage?: Storage;
  itemsPerPage: number;
  currentPage: number;
  categoryId?: string;
  // totalItems: number;
  constructor(private router: Router, private activedRouter: ActivatedRoute, private cartService: CartService, private categoryService: CategoryService, private userService: UserService, private productService: ProductService) {
    this.categories = [];
    // this.totalPages = 0;
    // this.totalItems = 0;
    this.products = [];
    this.currentPage = 1;
    this.itemsPerPage = 9;
  }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    // this.currentPage = Number(this.localStorage?.getItem('currentProductPage')) || 0;
    this.getCategories();
    this.getAllProducts();
  }
  addToCart(productId: string, quantity: number, flavorName: string): void {
    this.cartService.addToCart(productId, quantity, flavorName).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data.cart);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        console.log(apiResponse.data)
        const { categories } = apiResponse.data;
        this.categories = categories;
        // console.log(this.categories);
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
  getAllProductsByCategoryId() {
    this.activedRouter.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId') ?? '';
    });
    this.productService.getAllProductsByCategoryId(this.categoryId!).subscribe({
      next: (apiResponse: ApiResponse<ProductResponse>) => {
        const response = apiResponse.data;
        this.products = response.products;
      }
      , error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  onProductClick(productId: string) {
    this.router.navigate(['/products/product-detail', productId]);
  }
}
