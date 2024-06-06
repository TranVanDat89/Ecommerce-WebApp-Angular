import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../models/category';
import { StorageResponse } from '../../../responses/storage.response';
import { ArticleService } from '../../../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  articleCategories?: { id: string, name: string }[];
  isProducts: boolean = true;
  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, private articleService: ArticleService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required]
    })
    this.categories = [];
  }
  ngOnInit(): void {
    this.getCategories();
  }
  isArticleCategories() {
    this.isProducts = false;
  }
  createCategory() {
    if (this.categoryForm.valid) {
      if (this.isProducts) {
        console.log(this.categoryForm.value.category, "Products");
      } else {
        console.log(this.categoryForm.value.category, "Articles");
        this.isProducts = true;
      }
    }
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
  getAllArticleCategories() {
    this.articleService.getAllArticleCategories().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<{ id: string, name: string }[]>>) => {
        this.articleCategories = apiResponse.data.articleCategories;
        console.log(apiResponse.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
