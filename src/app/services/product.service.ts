import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { ApiResponse } from '../responses/api.response';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductResponse } from '../responses/product.response';
import { StorageResponse } from '../responses/storage.response';
import { FavoriteResponse } from '../responses/favorite.response';
import { Comment } from '../models/comment';
import { CommentDTO } from '../dtos/comment.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProduct = `${environment.apiBaseUrl}/products`;
  private apiProductById = `${environment.apiBaseUrl}/products/product-detail`;
  private apiProductGetTop4 = `${environment.apiBaseUrl}/products/get-top-4`;
  private apiProductFavorites = `${environment.apiBaseUrl}/favorite-products`;
  private apiProductComments = `${environment.apiBaseUrl}/comments/all`;
  private apiComments = `${environment.apiBaseUrl}/comments`;
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
  getAllFavorites(): Observable<ApiResponse<StorageResponse<FavoriteResponse[]>>> {
    return this.http.post<ApiResponse<StorageResponse<FavoriteResponse[]>>>(this.apiProductFavorites, this.apiConfig);
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
  getAllComments(): Observable<ApiResponse<StorageResponse<Comment[]>>> {
    return this.http.get<ApiResponse<StorageResponse<Comment[]>>>(this.apiProductComments);
  }
  getCommentsByProductId(productId: string): Observable<ApiResponse<StorageResponse<Comment[]>>> {
    return this.http.get<ApiResponse<StorageResponse<Comment[]>>>(this.apiComments + `?productId=${productId}`);
  }
  getAllProductsByCategoryId(categoryId: string): Observable<ApiResponse<ProductResponse>> {
    return this.http.get<ApiResponse<ProductResponse>>(this.apiProduct + `/category/${categoryId}`);
  }
  getCommentsByUserId(userId: string): Observable<ApiResponse<StorageResponse<CommentDTO[]>>> {
    return this.http.get<ApiResponse<StorageResponse<CommentDTO[]>>>(this.apiComments + `/user/${userId}`);
  }
}
