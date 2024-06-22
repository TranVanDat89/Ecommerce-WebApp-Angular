import { CommentDTO } from './../dtos/comment.dto';
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
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProduct = `${environment.apiBaseUrl}/products`;
  private apiProductById = `${environment.apiBaseUrl}/products/product-detail`;
  private apiProductGetTop4 = `${environment.apiBaseUrl}/products/get-top-4`;
  private apiProductFavorites = `${environment.apiBaseUrl}/favorite-products`;
  private apiProductComments = `${environment.apiBaseUrl}/comments/all/star-greater-than-3`;
  private apiComments = `${environment.apiBaseUrl}/comments`;
  private apiCreateListComment = `${environment.apiBaseUrl}/comments/create-list-comment`;
  private apiDeleteFav = `${environment.apiBaseUrl}/products/delete-wishlist/`;
  private apiAddFav = `${environment.apiBaseUrl}/products/add-to-wish-list/`;
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
  deleteFavorite(favId: string): Observable<any> {
    return this.http.delete<ApiResponse<any>>(this.apiDeleteFav + favId);
  }
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<ApiResponse<any>>(this.apiComments + `/delete/${commentId}`);
  }
  updateComment(commentId: string, commentDTO: CommentDTO): Observable<any> {
    return this.http.put<ApiResponse<any>>(this.apiComments + `/update-comment/${commentId}`, commentDTO, this.apiConfig);
  }
  addToWishList(productId: string): Observable<any> {
    return this.http.post<ApiResponse<any>>(this.apiAddFav + productId, this.apiConfig);
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
  getAllCommentsForAdmin(): Observable<ApiResponse<StorageResponse<Comment[]>>> {
    return this.http.get<ApiResponse<StorageResponse<Comment[]>>>(this.apiComments + '/all');
  }
  getCommentsByProductId(productId: string): Observable<ApiResponse<StorageResponse<Comment[]>>> {
    return this.http.get<ApiResponse<StorageResponse<Comment[]>>>(this.apiComments + `?productId=${productId}`);
  }
  getAllProductsByCategoryId(categoryId: string): Observable<ApiResponse<ProductResponse>> {
    return this.http.get<ApiResponse<ProductResponse>>(this.apiProduct + `/category/${categoryId}`);
  }
  getCommentsByUserId(userId: string): Observable<ApiResponse<StorageResponse<Comment[]>>> {
    return this.http.get<ApiResponse<StorageResponse<Comment[]>>>(this.apiComments + `/user/${userId}`);
  }
  createListComment(comments: CommentDTO[]): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiCreateListComment, comments, this.apiConfig);
  }
}
