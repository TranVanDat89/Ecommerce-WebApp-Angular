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
}
