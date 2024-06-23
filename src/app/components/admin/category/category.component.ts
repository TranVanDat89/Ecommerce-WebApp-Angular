import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../models/category';
import { StorageResponse } from '../../../responses/storage.response';
import { ArticleService } from '../../../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private articleService: ArticleService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required]
    })
    this.categories = [];
  }
  ngOnInit(): void {
    this.getCategories();
    this.getAllArticleCategories();
  }
  isArticleCategories() {
    this.isProducts = false;
  }
  deleteCategory(id: string, isArticleCategory: boolean) {
    debugger
    if (!isArticleCategory) {
      this.categoryService.deleteCategory(id, false).subscribe({
        next: (apiResponse: ApiResponse<any>) => {
          this.toastr.success("Xóa danh mục thành công", "Thành công");
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error("Xóa danh mục thất bại", "Thất bại");
          console.error(error?.error?.message ?? '');
        }
      })
    } else {
      this.categoryService.deleteCategory(id, true).subscribe({
        next: (apiResponse: ApiResponse<any>) => {
          this.toastr.success("Xóa danh mục thành công", "Thành công");
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error("Xóa danh mục thất bại", "Thất bại");
          console.error(error?.error?.message ?? '');
        }
      })
    }
  }
  createCategory() {
    if (this.categoryForm.valid) {
      if (this.isProducts) {
        this.categoryService.createCategory(this.categoryForm.value.category, false).subscribe({
          next: (apiResponse: ApiResponse<any>) => {
            this.toastr.success("Thêm danh mục thành công", "Thành công");
            window.location.reload();
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error("Thêm danh mục thất bại", "Thất bại");
            console.error(error?.error?.message ?? '');
          }
        })
      } else {
        this.categoryService.createCategory(this.categoryForm.value.category, true).subscribe({
          next: (apiResponse: ApiResponse<any>) => {
            this.toastr.success("Thêm danh mục thành công", "Thành công");
            this.isProducts = true;
            window.location.reload();
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.success("Thêm danh mục thành công", "Thành công");
            window.location.reload();
            console.error(error?.error?.message ?? '');
          }
        })
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
