import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { HttpUtilService } from "./http-util.service";
import { environment } from "../environments/environment";
import { Article } from "../models/article";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";
import { ArticleDTO } from "../dtos/article/article.dto";
import { StorageResponse } from "../responses/storage.response";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiArticleCreate = `${environment.apiBaseUrl}/articles/create-article`;
    private apiGetAllArticles = `${environment.apiBaseUrl}/articles/all`;
    private apiGetAllArticleCategories = `${environment.apiBaseUrl}/articles/all-article-category`;
    private apiArticleDetail = `${environment.apiBaseUrl}/articles/get-article/`;
    private apiArticleByCategory = `${environment.apiBaseUrl}/articles/category/`;
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);

    private apiConfig = {
        headers: this.httpUtilService.createHeaders()
    }
    constructor() {
    }
    createArticle(articleDTO: ArticleDTO): Observable<ApiResponse<StorageResponse<Article>>> {
        console.log(articleDTO, "services");
        const formData = new FormData();
        formData.append('title', articleDTO.title.trim());
        formData.append('articleCategoryId', articleDTO.articleCategoryId.trim());
        if (articleDTO.imageFile) {
            formData.append('imageFile', articleDTO.imageFile);
        }
        formData.append('content', articleDTO.content.trim());
        return this.http.post<ApiResponse<StorageResponse<Article>>>(this.apiArticleCreate, formData);
    }
    getAllArticles(): Observable<ApiResponse<StorageResponse<Article[]>>> {
        return this.http.get<ApiResponse<StorageResponse<Article[]>>>(this.apiGetAllArticles);
    }
    getAllArticleCategories(): Observable<ApiResponse<StorageResponse<{ id: string, name: string }[]>>> {
        return this.http.get<ApiResponse<StorageResponse<{ id: string, name: string }[]>>>(this.apiGetAllArticleCategories);
    }
    getArticleDetail(articleId: string): Observable<ApiResponse<StorageResponse<Article>>> {
        return this.http.get<ApiResponse<StorageResponse<Article>>>(`${this.apiArticleDetail}${articleId}`);
    }
    getAllArticlesByCategory(categoryId: string): Observable<ApiResponse<StorageResponse<Article[]>>> {
        return this.http.get<ApiResponse<StorageResponse<Article[]>>>(this.apiArticleByCategory + categoryId);
    }
}