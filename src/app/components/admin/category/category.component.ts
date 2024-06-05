import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  constructor(private categoryService: CategoryService) {
    this.categories = [];
  }
  ngOnInit(): void {
    this.getCategories();
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
}
