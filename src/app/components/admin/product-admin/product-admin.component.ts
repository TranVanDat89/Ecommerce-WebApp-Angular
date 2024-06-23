import { Flavor } from './../../../models/flavor';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ProductResponse } from '../../../responses/product.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageResponse } from '../../../responses/storage.response';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { ProductDTO } from '../../../dtos/product.dto';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  products: Product[];
  currentProductId?: string;
  currentProduct?: Product;
  productsWithMaxSolved: Product[];
  selectedYear: number = new Date().getFullYear();
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);
  // productDeleted?: Product;
  productNameDeleted: string = '';
  productIdDeleted: string = '';
  productForm: FormGroup;
  images: File[] = [];
  categories: Category[];
  loadDataForYear(selectedYear: number) {

  }

  constructor(private productService: ProductService, private categoryService: CategoryService, private toastr: ToastrService, private modalService: NgbModal, private fb: FormBuilder) {
    this.products = [];
    this.productsWithMaxSolved = [];
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
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductsWithMaxSolved(this.selectedYear);
    this.getCategories();
    // this.getProductById(this.currentProductId!);
    // this.populateData();
  }
  // populateData() {
  //   this.productForm.get('name')?.setValue(this.currentProduct?.name);
  //   this.productForm.get('price')?.setValue(this.currentProduct?.price);
  //   this.productForm.get('quantity')?.setValue(this.currentProduct?.quantity);
  //   this.productForm.get('brand')?.setValue(this.currentProduct?.ingredient.brand);
  //   this.productForm.get('weight')?.setValue(this.currentProduct?.ingredient.weight);
  //   this.productForm.get('servingSize')?.setValue(this.currentProduct?.ingredient.servingSize);
  //   this.productForm.get('serving')?.setValue(this.currentProduct?.ingredient.serving);
  //   this.productForm.get('calories')?.setValue(this.currentProduct?.ingredient.calories);
  //   this.productForm.get('ingredientList')?.setValue(this.currentProduct?.ingredient.ingredientList);
  //   this.productForm.get('proteinPerServing')?.setValue(this.currentProduct?.ingredient.proteinPerServing);
  //   this.productForm.get('origin')?.setValue(this.currentProduct?.ingredient.origin);
  //   this.productForm.get('introduction')?.setValue(this.currentProduct?.productDetail.introduction);
  //   this.productForm.get('instruction')?.setValue(this.currentProduct?.productDetail.instruction);
  //   this.productForm.get('advantage')?.setValue(this.currentProduct?.productDetail.advantage);
  //   this.productForm.get('warning')?.setValue(this.currentProduct?.productDetail.warning);
  // }
  getProductById(productId: string) {
    this.productService.getProductById(productId).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        const { product } = apiResponse.data;
        console.log(apiResponse.data, product)
        this.productForm.get('name')?.setValue(product?.name);
        this.productForm.get('price')?.setValue(product?.price);
        this.productForm.get('quantity')?.setValue(product?.quantity);
        this.productForm.get('brand')?.setValue(product?.ingredient.brand);
        this.productForm.get('weight')?.setValue(product?.ingredient.weight);
        this.productForm.get('servingSize')?.setValue(product.ingredient.servingSize);
        this.productForm.get('serving')?.setValue(product.ingredient.serving);
        this.productForm.get('calories')?.setValue(product.ingredient.calories);
        this.productForm.get('ingredientList')?.setValue(product.ingredient.ingredientList);
        this.productForm.get('proteinPerServing')?.setValue(product.ingredient.proteinPerServing);
        this.productForm.get('origin')?.setValue(product?.ingredient.origin);
        let flavors: any = product.ingredient.flavors.map((flavor: { name: any; }) => flavor.name);
        this.productForm.get('flavors')?.setValue(flavors);

        this.productForm.get('introduction')?.setValue(product?.productDetail.introduction);
        this.productForm.get('instruction')?.setValue(product?.productDetail.instruction);
        this.productForm.get('advantage')?.setValue(product?.productDetail.advantage);
        this.productForm.get('warning')?.setValue(product?.productDetail.warning);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
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
  updateProduct() {
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
      warning: this.productForm.get('warning')?.value
    }
    console.log(product);

    this.productService.updateProduct(this.currentProductId!, product).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        this.toastr.success("Cập nhật sản phẩm thành công", 'Thành công');
        window.location.reload();
        console.log(apiResponse)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Cập nhật sản phẩm thất bại", "Thất bại");
        console.error(error?.error?.message ?? '');
      }
    })
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.images = Array.from(input.files);
    }
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
    this.productService.deleteProduct(productId!).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        this.toastr.success("Xóa sản phẩm thành công", "Thành công");
        this.modalService.dismissAll();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Xóa sản phẩm thất bại", "Thất bại");
        console.error(error?.error?.message ?? '');
      }
    })
  }
  openModal(modal: any, productId?: string) {
    this.currentProductId = productId;
    this.getProductById(productId!);
    this.modalService.open(modal);
    console.log(this.currentProductId);
  }
}
