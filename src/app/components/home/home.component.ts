import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../responses/product.response';
import { Comment } from '../../models/comment';
import { StorageResponse } from '../../responses/storage.response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  top4Product: Product[];
  comments: Comment[] | undefined;
  itemsPerPage: number = 6;
  currentPage: number = 1;
  constructor(private router: Router, private productService: ProductService) {
    this.top4Product = [];
  }
  ngOnInit(): void {
    this.getTop4();
    this.getAllComments();
  }
  getAllComments() {
    this.productService.getAllComments().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Comment[]>>) => {
        this.comments = apiResponse.data.comments;
        console.log(apiResponse.data, this.top4Product)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  getStarsArray(star: number): any[] {
    return new Array(star);
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
