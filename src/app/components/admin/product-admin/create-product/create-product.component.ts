import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category';
import { ApiResponse } from '../../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDTO } from '../../../../dtos/product.dto';
import { ProductService } from '../../../../services/product.service';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  categories: Category[];
  productForm: FormGroup;
  images: File[] = [];
  constructor(private categoryService: CategoryService, private toastr: ToastrService, private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      categoryName: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
      brand: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      servingSize: [''],
      serving: [''],
      calories: [''],
      ingredientList: ['', [Validators.required]],
      proteinPerServing: [''],
      origin: ['', [Validators.required]],
      flavors: ['', [Validators.required]],
      introduction: [''],
      instruction: [''],
      advantage: [''],
      warning: [''],
      images: [File, [Validators.required]]
    })
    this.categories = [];
  }
  ngOnInit(): void {
    this.getCategories();
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.images = Array.from(input.files);
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
  createProduct() {
    debugger
    const product: ProductDTO = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      categoryName: this.productForm.get('categoryName')?.value,
      quantity: this.productForm.get('quantity')?.value,
      brand: this.productForm.get('brand')?.value,
      weight: this.productForm.get('weight')?.value,
      servingSize: this.productForm.get('servingSize')?.value,
      serving: this.productForm.get('serving')?.value,
      calories: this.productForm.get('calories')?.value,
      ingredientList: this.productForm.get('ingredientList')?.value,
      proteinPerServing: this.productForm.get('proteinPerServing')?.value,
      origin: this.productForm.get('origin')?.value,
      flavors: this.productForm.get('flavors')?.value,
      introduction: this.productForm.get('introduction')?.value,
      instruction: this.productForm.get('instruction')?.value,
      advantage: this.productForm.get('advantage')?.value,
      warning: this.productForm.get('warning')?.value,
      images: this.images
    }

    this.productService.createProduct(product).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        this.toastr.success("Thêm sản phẩm thành công", "Thành công");
        this.productForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Thêm sản phẩm thất bại", "Thất bại");
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
