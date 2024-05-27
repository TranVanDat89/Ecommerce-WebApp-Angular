import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { ApiResponse } from '../responses/api.response';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductResponse } from '../responses/product.response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProduct = `${environment.apiBaseUrl}/products`;
  private apiProductById = `${environment.apiBaseUrl}/products/product-detail`;
  private apiProductGetTop4 = `${environment.apiBaseUrl}/products/get-top-4`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);
  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() { }

  getAllProducts(page: number, limit: number): Observable<ApiResponse<ProductResponse>> {
    const params = {
      page: page.toString(),
      limit: limit.toString()
    }
    return this.http.get<ApiResponse<ProductResponse>>(this.apiProduct, { params });
  }
  getAllProductsWithoutPagination(): Observable<ApiResponse<ProductResponse>> {
    return this.http.get<ApiResponse<ProductResponse>>(this.apiProduct);
  }
  getProductById(productId: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(this.apiProductById + `/${productId}`);
  }
  getTop4(): Observable<ApiResponse<ProductResponse>> {
    return this.http.get<ApiResponse<ProductResponse>>(this.apiProductGetTop4);
  }
}
