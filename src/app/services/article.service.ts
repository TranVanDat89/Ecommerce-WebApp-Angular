import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { HttpUtilService } from "./http-util.service";
import { environment } from "../environments/environment";
import { Article } from "../models/article";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";
import { ArticleDTO } from "../dtos/article/article.dto";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiArticleCreate = `${environment.apiBaseUrl}/articles/create-article`;
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);

    private apiConfig = {
        headers: this.httpUtilService.createHeaders()
    }
    constructor() {
    }

    // createArticle(formData: FormData): Observable<ApiResponse<Article>> {
    //     return this.http.post<ApiResponse<Article>>(this.apiArticleCreate, formData, this.apiConfig);
    // }
    createArticle(articleDTO: ArticleDTO): Observable<ApiResponse<Article>> {
        console.log(articleDTO, "services");
        const formData = new FormData();
        formData.append('title', articleDTO.title.trim());
        formData.append('category', articleDTO.category.trim());
        if (articleDTO.imageFile) {
            formData.append('imageFile', articleDTO.imageFile);
        }
        formData.append('content', articleDTO.content.trim());
        return this.http.post<ApiResponse<Article>>(this.apiArticleCreate, formData, this.apiConfig);
    }
}