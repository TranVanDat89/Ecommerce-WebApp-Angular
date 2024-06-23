import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpUtilService } from './http-util.service';
import { ApiResponse } from '../responses/api.response';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiCategories = `${environment.apiBaseUrl}/categories`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);

  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() { }

  getAllCategories(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiCategories, this.apiConfig);
  }
  createCategory(name: string, isArticleCategory: boolean): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiCategories + `?isArticleCategory=${isArticleCategory}`, name, this.apiConfig);
  }
  deleteCategory(id: string, isArticleCategory: boolean): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.apiCategories + `/${id}?isArticleCategory=${isArticleCategory}`, this.apiConfig);
  }
}
